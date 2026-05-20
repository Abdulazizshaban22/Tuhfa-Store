import { Controller, Get, Param, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Response } from 'express';
const prisma = new PrismaClient();
@Controller('dl')
export class ResolverController {
  @Get(':gtin')
  async resolve(@Param('gtin') gtin: string, @Res() res: Response){
    const map = await prisma.gs1Map.findUnique({ where:{ gtin } });
    if(!map){ return res.redirect(302, `/not-found?gtin=${encodeURIComponent(gtin)}`); }
    const prod = await prisma.product.findUnique({ where:{ id: map.productId }, select:{ externalId: true } });
    return res.redirect(302, `/product/${encodeURIComponent(prod?.externalId || '')}`);
  }
}
