import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ethers, verifyTypedData } from 'ethers';
import { NotifierService } from '../notifier/notifier.service';

@Controller('admin/web3')
export class Web3Controller {
  private prisma = new PrismaClient();
  constructor(private notifier: NotifierService) {}

  @Post('mint721')
  async mint721(@Body() body: any) {
    const { to, tokenURI } = body;
    if (!to || !tokenURI) throw new Error('to and tokenURI required');
    const rpc = process.env.ETH_RPC;
    const contractAddr = process.env.TOHFA_ERC721;
    const ownerPk = process.env.OWNER_PK;

    if (rpc && contractAddr && ownerPk) {
      const provider = new ethers.JsonRpcProvider(rpc);
      const wallet = new ethers.Wallet(ownerPk, provider);
      const abi = ["function safeMint(address to, string tokenURI_) external returns (uint256)"];
      const c = new ethers.Contract(contractAddr, abi, wallet);
      const tx = await c.safeMint(to, tokenURI);
      const receipt = await tx.wait();
      return { status: 'onchain', tx: tx.hash, block: receipt?.blockNumber };
    } else {
      const r = await this.prisma.mintRequest.create({ data: { to, tokenURI, standard: 'ERC721', status: 'queued' } });
      return { status: 'queued', id: r.id };
    }
  }

  // Derive keccak256 hash from raw UID
  @Post('nfc/hash')
  async nfcHash(@Body() body: any) {
    const { uid } = body;
    if (!uid) throw new Error('uid required');
    const tagHash = ethers.keccak256(ethers.toUtf8Bytes(String(uid)));
    return { tagHash };
  }

  // EIP-712 for NFC link
  @Post('eip712/link-typed-data')
  async linkTypedData(@Body() body: any) {
    const { chainId = 1, verifyingContract = '0x0000000000000000000000000000000000000000', tagHash, contract, tokenId, expires } = body;
    if (!tagHash || !contract || !tokenId) throw new Error('tagHash, contract, tokenId required');
    const domain = { name: 'Tohfa', version: '1', chainId: Number(chainId), verifyingContract };
    const types = {
      NfcLink: [
        { name: 'tagHash', type: 'bytes32' },
        { name: 'contract', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'expires', type: 'uint256' }
      ]
    };
    const message = {
      tagHash,
      contract,
      tokenId: String(tokenId),
      expires: String(expires || Math.floor(Date.now()/1000) + 3600)
    };
    return { domain, types, primaryType: 'NfcLink', message };
  }

  @Post('eip712/verify-link')
  async verifyLink(@Body() body: any) {
    const { signature, typedData, productId } = body;
    if (!signature || !typedData) throw new Error('signature and typedData required');
    const { domain, types, message } = typedData;
    const signer = verifyTypedData(domain, types, message, signature);
    const link = await this.prisma.nfcLink.upsert({
      where: { tagHash: message.tagHash },
      update: { contract: message.contract, tokenId: String(message.tokenId), productId: productId || null },
      create: { tagHash: message.tagHash, contract: message.contract, tokenId: String(message.tokenId), productId: productId || null }
    });
    await this.notifier.slack(`🔗 NFC linked to NFT ${message.contract} #${message.tokenId} by ${signer}`);
    return { ok: true, signer, link };
  }

  // --- EIP-712 PurchaseIntent: sign in wallet, verify server-side, create Order(status='signed')
  @Post('eip712/purchase-typed-data')
  async purchaseTypedData(@Body() body: any) {
    const { chainId = 1, productId, qty = 1 } = body;
    if (!productId) throw new Error('productId required');
    const p = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!p) throw new Error('Product not found');
    const priceCents = p.priceCents * Number(qty || 1);
    const expires = Math.floor(Date.now()/1000) + 10 * 60;
    const nonce = ethers.keccak256(ethers.randomBytes(32));
    const domain = { name: 'TohfaCheckout', version: '1', chainId: Number(chainId), verifyingContract: '0x0000000000000000000000000000000000000000' };
    const types = {
      PurchaseIntent: [
        { name: 'productId', type: 'string' },
        { name: 'qty', type: 'uint256' },
        { name: 'priceCents', type: 'uint256' },
        { name: 'currency', type: 'string' },
        { name: 'expires', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' }
      ]
    };
    const message = {
      productId: String(productId),
      qty: String(qty),
      priceCents: String(priceCents),
      currency: p.currency,
      expires: String(expires),
      nonce
    };
    const intent = await this.prisma.purchaseIntent.create({
      data: { productId: p.id, qty: Number(qty), priceCents, currency: p.currency, expires, nonce }
    });
    return { intentId: intent.id, domain, types, primaryType: 'PurchaseIntent', message };
  }

  @Post('eip712/verify-purchase')
  async verifyPurchase(@Body() body: any) {
    const { signature, typedData, intentId } = body;
    if (!signature || !typedData || !intentId) throw new Error('signature, typedData, intentId required');
    const intent = await this.prisma.purchaseIntent.findUnique({ where: { id: intentId } });
    if (!intent) throw new Error('intent not found');
    const { domain, types, message } = typedData;
    // Basic expiry/nonce checks
    if (Number(message.expires) < Math.floor(Date.now()/1000)) throw new Error('intent expired');
    if (String(message.nonce).toLowerCase() != String(intent.nonce).toLowerCase()) throw new Error('nonce mismatch');
    // Recover signer
    const signer = verifyTypedData(domain, types, message, signature);
    // Create Order with status 'signed'
    const order = await this.prisma.order.create({
      data: {
        status: 'signed',
        totalCents: Number(message.priceCents),
        currency: message.currency,
        buyerAddress: signer,
        signature,
        nonce: message.nonce,
        items: { create: [{ productId: intent.productId, quantity: intent.qty, unitCents: Math.floor(intent.priceCents / intent.qty) }] }
      }
    });
    await this.prisma.purchaseIntent.update({ where: { id: intentId }, data: { signer, signature, orderId: order.id } });
    await this.notifier.slack(`📝 Signed Purchase — ${order.id} by ${signer} — SAR ${(order.totalCents/100).toFixed(2)}`);
    return { ok: true, orderId: order.id, signer };
  }
}
