import { Controller, Get, Param, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {
  @Get()
  async list(@Query('q') q?: string, @Query('craft') craft?: string){
    const where:any = {};
    if(q) where.OR = [{ title: { contains: q, mode:'insensitive' } }, { description: { contains: q, mode:'insensitive' } }];
    if(craft) where.description = { contains: craft, mode:'insensitive' };
    const data = await prisma.product.findMany({ where, take: 50 });
    return { count: data.length, data };
  }

  @Get(':externalId')
  async one(@Param('externalId') externalId: string){
    const p = await prisma.product.findUnique({ where: { externalId } });
    return p || { ok:false, error:'NOT_FOUND' };
  }

  @Get(':externalId/recommendations')
  async recs(@Param('externalId') externalId: string){
    // Demo vector KNN placeholder (in production use pgvector <-> operator)
    const all = await prisma.product.findMany({ take: 16 });
    return { items: all.filter(x=>x.externalId!==externalId).slice(0,8) };
  }
}
