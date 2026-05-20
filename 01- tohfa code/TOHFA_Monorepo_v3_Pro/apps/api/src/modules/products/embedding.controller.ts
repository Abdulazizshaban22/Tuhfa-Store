import { Body, Controller, Param, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Controller('products') export class ProductEmbeddingController {
  @Put(':externalId/embedding') async putEmbedding(@Param('externalId') externalId: string, @Body() body: any){
    const { vector } = body as { vector: number[] };
    if (!Array.isArray(vector) || !vector.length) return { ok:false, error:'Invalid vector' };
    const product = await prisma.product.findUnique({ where: { externalId } });
    if (!product) return { ok:false, error:'Product not found' };
    await prisma.$executeRawUnsafe(`UPDATE "Product" SET embedding = $1::vector WHERE "externalId" = $2`, `[${vector.join(',')}]`, externalId);
    return { ok:true };
  }
}
