import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class Web3Service {
  async prepareMetadata(externalId: string){
    const p = await prisma.product.findUnique({ where:{ externalId }, include:{ artisan:true, craftType:true } });
    if(!p) throw new Error('Product not found');
    const metadata = {
      name: p.titleAr,
      description: `تحفة من ${p.artisan?.nameAr || 'حرفي'} — ${p.craftType?.nameAr || ''}`,
      image: p.images?.[0] || "",
      attributes: [
        { trait_type: "craft", value: p.craftType?.nameAr || "" },
        { trait_type: "region", value: p.craftType?.regionPrimaryCode || "" },
        { trait_type: "status", value: p.status },
      ]
    };
    return metadata;
  }
}
