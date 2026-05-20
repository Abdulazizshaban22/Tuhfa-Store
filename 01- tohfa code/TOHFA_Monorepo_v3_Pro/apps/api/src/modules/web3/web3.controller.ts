import { Body, Controller, Param, Post } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3: Web3Service){}
  @Post('nft/:externalId/prepare')
  async prepare(@Param('externalId') externalId: string){
    const meta = await this.web3.prepareMetadata(externalId);
    // Persist and return URL (here we just store JSON string as metadataUrl placeholder)
    const murl = `ipfs://placeholder/${externalId}.json`;
    await prisma.nftCertificate.upsert({ where:{ productId: (await prisma.product.findUnique({ where:{ externalId }, select:{ id:true } }))!.id }, update:{ metadataUrl: murl }, create:{ productId:(await prisma.product.findUnique({ where:{ externalId }, select:{ id:true } }))!.id, metadataUrl: murl } });
    return { ok:true, metadata: meta, metadataUrl: murl };
  }
}
