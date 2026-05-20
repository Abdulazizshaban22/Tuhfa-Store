import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';

@Controller('admin/web3')
export class Web3Controller {
  private prisma = new PrismaClient();

  /**
   * Mint ERC721 if ENV is set; otherwise queue the request in DB
   * ENV: ETH_RPC, TOHFA_ERC721, OWNER_PK (server-controlled)
   */
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
      // Guess tokenId by reading nextId-1 if contract supports it, else return tx hash.
      return { status: 'onchain', tx: tx.hash, block: receipt?.blockNumber };
    } else {
      const r = await this.prisma.mintRequest.create({ data: { to, tokenURI, standard: 'ERC721', status: 'queued' } });
      return { status: 'queued', id: r.id };
    }
  }

  /**
   * Link NFC tag (uid hash) to onchain token
   */
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
