import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';

const prisma = new PrismaClient();

/**
 * Minimal ERC-721 ABI with safeMint/mint and ownerOf. Adjust function name with NFT_MINT_FN env.
 */
const ERC721_ABI = [
  "function safeMint(address to, string uri) public returns (uint256)",
  "function mint(address to, string uri) public returns (uint256)",
  "function mintTo(address to, string uri) public returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

@Injectable()
export class Web3MintService {
  private rpc = process.env.POLYGON_RPC_URL || "https://polygon-rpc.com";
  private pk = process.env.WEB3_PRIVATE_KEY || "";
  private contractAddr = process.env.NFT_CONTRACT_ADDRESS || "";
  private mintFn = process.env.NFT_MINT_FN || "safeMint";
  private chainId = parseInt(process.env.CHAIN_ID || "137", 10);

  private getSigner(){
    if(!this.pk) throw new Error("WEB3_PRIVATE_KEY missing");
    const provider = new ethers.JsonRpcProvider(this.rpc, { chainId: this.chainId });
    return new ethers.Wallet(this.pk, provider);
  }

  private getContract(){
    if(!this.contractAddr) throw new Error("NFT_CONTRACT_ADDRESS missing");
    const signer = this.getSigner();
    return new ethers.Contract(this.contractAddr, ERC721_ABI, signer);
  }

  async mintForProduct(externalId: string, to: string){
    const product = await prisma.product.findUnique({ where:{ externalId } });
    if (!product) throw new Error("Product not found");
    const cert = await prisma.nftCertificate.upsert({
      where: { productId: product.id },
      create: { productId: product.id, chainId: this.chainId, contractAddress: this.contractAddr, ownerAddress: to, metadataUrl: undefined },
      update: { ownerAddress: to, chainId: this.chainId, contractAddress: this.contractAddr }
    });

    // use saved metadata or placeholder
    const meta = await prisma.nftCertificate.findUnique({ where: { productId: product.id } });
    const tokenURI = meta?.metadataUrl || `ipfs://placeholder/${externalId}.json`;

    const contract = this.getContract();
    const fn = (contract as any)[this.mintFn] || (contract as any)["mint"] || (contract as any)["mintTo"];
    if(!fn) throw new Error("No mint function found on contract");

    const tx = await fn(to, tokenURI);
    const receipt = await tx.wait();

    // read Transfer event for tokenId if present
    let tokenId = null as null | string;
    for (const log of receipt.logs || []) {
      try {
        const parsed = contract.interface.parseLog(log);
        if (parsed?.name === "Transfer") {
          tokenId = parsed?.args?.tokenId?.toString?.() || null;
          break;
        }
      } catch {}
    }

    await prisma.nftCertificate.update({
      where:{ id: cert.id },
      data: { tokenId: tokenId || undefined, ownerAddress: to, txHash: receipt?.hash }
    });

    return {
      ok: true,
      txHash: receipt?.hash,
      tokenId,
      contract: this.contractAddr,
      chainId: this.chainId,
      tokenURI
    };
  }

  async ownerOfToken(externalId: string){
    const product = await prisma.product.findUnique({ where:{ externalId }, select:{ id:true } });
    if(!product) throw new Error("Product not found");
    const cert = await prisma.nftCertificate.findUnique({ where:{ productId: product.id } });
    if(!cert?.tokenId) return { exists:false };
    const contract = this.getContract();
    const owner = await contract.ownerOf(BigInt(cert.tokenId));
    return { exists: true, owner, tokenId: cert.tokenId, contract: this.contractAddr, chainId: this.chainId };
  }
}
