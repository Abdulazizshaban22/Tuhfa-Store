import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ethers, verifyTypedData } from 'ethers';

@Controller('admin/web3')
export class Web3Controller {
  private prisma = new PrismaClient();

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

  // Generate typed data for EIP-712 NFC link
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
      expires: String(expires || Math.floor(Date.now()/1000) + 3600) // +1h
    };
    return { domain, types, primaryType: 'NfcLink', message };
  }

  // Verify EIP-712 signature and persist NfcLink if signer is product creator (placeholder check)
  @Post('eip712/verify-link')
  async verifyLink(@Body() body: any) {
    const { signature, typedData, productId } = body;
    if (!signature || !typedData) throw new Error('signature and typedData required');
    const { domain, types, message } = typedData;
    const signer = verifyTypedData(domain, types, message, signature);
    // Persist link
    const link = await this.prisma.nfcLink.upsert({
      where: { tagHash: message.tagHash },
      update: { contract: message.contract, tokenId: String(message.tokenId), productId: productId || null },
      create: { tagHash: message.tagHash, contract: message.contract, tokenId: String(message.tokenId), productId: productId || null }
    });
    return { ok: true, signer, link };
  }

  // Derive keccak256 hash from raw UID
  @Post('nfc/hash')
  async nfcHash(@Body() body: any) {
    const { uid } = body;
    if (!uid) throw new Error('uid required');
    const tagHash = ethers.keccak256(ethers.toUtf8Bytes(String(uid)));
    return { tagHash };
  }

  // Link NFC directly (no signature)
  @Post('link-nfc')
  async linkNfc(@Body() body: any) {
    const { tagUid, contract, tokenId, productId } = body;
    if (!tagUid || !contract || !tokenId) throw new Error('tagUid, contract, tokenId required');
    const tagHash = ethers.keccak256(ethers.toUtf8Bytes(String(tagUid)));
    const link = await this.prisma.nfcLink.upsert({
      where: { tagHash },
      update: { contract, tokenId: String(tokenId), productId: productId || null },
      create: { tagHash, contract, tokenId: String(tokenId), productId: productId || null }
    });
    return { ok: true, link };
  }
}
