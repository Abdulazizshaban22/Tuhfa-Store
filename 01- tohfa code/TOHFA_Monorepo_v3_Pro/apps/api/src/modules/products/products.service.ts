import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  list(params: any = {}) {
    const { q, craftTypeCode, regionCode, patterns = [], materials = [], take = 20, skip = 0 } = params;
    return prisma.product.findMany({
      take, skip,
      where: {
        AND: [
          q ? { titleAr: { contains: q } } : {},
          craftTypeCode ? { craftTypeCode } : {},
          regionCode ? { craftType: { regionPrimaryCode: regionCode } } : {},
          patterns.length ? { craftType: { patterns: { hasSome: patterns } } } : {},
          materials.length ? { craftType: { materials: { hasSome: materials } } } : {},
        ]
      },
      include: { artisan: true, craftType: true, museumExhibit: true }
    });
  }
  byExternalId(externalId: string) {
    return prisma.product.findUnique({ where: { externalId }, include: { artisan: true, craftType: true, museumExhibit: true, passport: true } });
  }
  async recommendations(externalId: string, k = 8){
    const p = await prisma.product.findUnique({ where: { externalId }, select: { embedding: true, id: true } });
    if (!p || !p.embedding) return [];
    // Simple cosine similarity via SQL using pgvector <-> operator
    const rows = await prisma.$queryRawUnsafe(`
      SELECT "externalId","titleAr","priceSar","images","craftTypeCode"
      FROM "Product"
      WHERE embedding IS NOT NULL AND "externalId" != $1
      ORDER BY embedding <-> (SELECT embedding FROM "Product" WHERE "externalId" = $1)
      LIMIT $2
    `, externalId, k);
    return rows;
  }
}
