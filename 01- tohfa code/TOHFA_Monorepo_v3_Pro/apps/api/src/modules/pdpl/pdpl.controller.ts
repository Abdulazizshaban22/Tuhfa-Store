import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Controller('pdpl')
export class PdplController {
  @Post('incidents')
  async create(@Body() body: any){
    const { title, severity='low', occurredAt, detectedAt, details } = body;
    const row = await prisma.pdplIncident.create({ data:{ title, severity, occurredAt: new Date(occurredAt), detectedAt: new Date(detectedAt), details } });
    return { ok:true, id: row.id };
  }
  @Get('incidents')
  list(){ return prisma.pdplIncident.findMany({ orderBy:{ createdAt:'desc' } }); }
}
