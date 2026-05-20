import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
const prisma = new PrismaClient();

function isDemo(){
  return process.env.DEMO_MODE==='true' || !process.env.WEB3_PRIVATE_KEY || !process.env.NFT_CONTRACT_ADDRESS;
}

const ABI = [
  "function safeMint(address to, string uri) public returns (uint256)",
  "function mint(address to, string uri) public returns (uint256)",
  "function mintTo(address to, string uri) public returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

@Controller('web3')
export class Web3MintController {
  @Post('nft/:externalId/mint')
  async mint(@Param('externalId') externalId:string, @Body() body:any){
    const to = body?.ownerAddress;
    if(!to) return { ok:false, error:'ownerAddress required' };
    const product = await prisma.product.findUnique({ where:{ externalId } });
    if(!product) return { ok:false, error:'PRODUCT_NOT_FOUND' };

    // DEMO path
    if(isDemo()){
      const tokenId = `DEMO-${Date.now()}`;
      await prisma.nftCertificate.upsert({
        where:{ productId: product.id },
        create:{ productId: product.id, tokenId, ownerAddress: to, chainId:0, contractAddress:'DEMO', metadataUrl:`demo://${externalId}` },
        update:{ tokenId, ownerAddress: to, chainId:0, contractAddress:'DEMO', metadataUrl:`demo://${externalId}` }
      });
      return { ok:true, tokenId, contract:'DEMO', chainId:0 };
    }

    // LIVE path
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL, { chainId: parseInt(process.env.CHAIN_ID||'137',10) });
    const signer = new ethers.Wallet(process.env.WEB3_PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS!, ABI, signer);
    const meta = await prisma.nftCertificate.findUnique({ where:{ productId: product.id } });
    const tokenURI = meta?.metadataUrl || `ipfs://placeholder/${externalId}.json`;
    const fnName = process.env.NFT_MINT_FN || 'safeMint';
    const fn = (contract as any)[fnName] || (contract as any)['mint'] || (contract as any)['mintTo'];
    const tx = await fn(to, tokenURI);
    const receipt = await tx.wait();
    let tokenId:any=null;
    for(const log of receipt.logs||[]){
      try{
        const parsed = contract.interface.parseLog(log);
        if(parsed?.name==='Transfer'){ tokenId = parsed.args?.tokenId?.toString?.(); break; }
      }catch{}
    }
    await prisma.nftCertificate.upsert({
      where:{ productId: product.id },
      create:{ productId: product.id, tokenId, ownerAddress: to, chainId: parseInt(process.env.CHAIN_ID||'137',10), contractAddress: String(process.env.NFT_CONTRACT_ADDRESS), metadataUrl: tokenURI, txHash: receipt?.hash },
      update:{ tokenId, ownerAddress: to, chainId: parseInt(process.env.CHAIN_ID||'137',10), contractAddress: String(process.env.NFT_CONTRACT_ADDRESS), metadataUrl: tokenURI, txHash: receipt?.hash }
    });
    return { ok:true, tokenId, txHash: receipt?.hash };
  }

  @Get('nft/:externalId/owner')
  async owner(@Param('externalId') externalId:string){
    const product = await prisma.product.findUnique({ where:{ externalId }, select:{ id:true } });
    if(!product) return { ok:false, error:'PRODUCT_NOT_FOUND' };
    const cert = await prisma.nftCertificate.findUnique({ where:{ productId: product.id } });
    if(!cert?.tokenId) return { exists:false };
    if(isDemo()) return { exists:true, owner: cert.ownerAddress || '0xDEMO', tokenId: cert.tokenId, contract: cert.contractAddress, chainId: cert.chainId };
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL, { chainId: parseInt(process.env.CHAIN_ID||'137',10) });
    const contract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS!, ABI, provider);
    const owner = await contract.ownerOf(BigInt(cert.tokenId));
    return { exists:true, owner, tokenId: cert.tokenId, contract: cert.contractAddress, chainId: cert.chainId };
  }
}
