import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type ListParams = {
  q?: string;
  craftTypeCode?: string;
  regionCode?: string;
  patterns?: string[];
  materials?: string[];
  take?: number;
  skip?: number;
};

@Injectable()
export class ProductsService {
  findMany(params: ListParams = {}) {
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
  findByExternalId(externalId: string) {
    return prisma.product.findUnique({
      where: { externalId },
      include: { artisan: true, craftType: true, museumExhibit: true, passport: true }
    });
  }
}
