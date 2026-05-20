import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  findMany(params: { q?: string; craftTypeCode?: string; take?: number; skip?: number } = {}) {
    const { q, craftTypeCode, take = 20, skip = 0 } = params;
    return prisma.product.findMany({
      take, skip,
      where: {
        AND: [
          q ? { titleAr: { contains: q } } : {},
          craftTypeCode ? { craftTypeCode } : {},
        ]
      },
      include: { artisan: true, craftType: true, museumExhibit: true }
    });
  }

  findByExternalId(externalId: string) {
    return prisma.product.findUnique({ where: { externalId }, include: { artisan: true, craftType: true, museumExhibit: true, passport: true } });
  }
}
