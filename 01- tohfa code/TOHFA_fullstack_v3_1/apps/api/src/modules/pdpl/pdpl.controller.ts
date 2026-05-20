import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller()
export class PdplController {
  private prisma = new PrismaClient();

  @Post('pdpl/requests')
  async create(@Body() body: any) {
    const { subjectEmail, type, details } = body;
    if (!subjectEmail || !type) throw new Error('subjectEmail and type required');
    const r = await this.prisma.pdplRequest.create({
      data: { subjectEmail, type, details: details || {}, status: 'received' }
    });
    return { ok: true, request: r };
  }

  @Get('admin/pdpl/requests')
  async list() {
    const rows = await this.prisma.pdplRequest.findMany({ orderBy: { receivedAt: 'desc' }, take: 200 });
    return { items: rows };
  }

  @Post('admin/pdpl/requests/:id/resolve')
  async resolve(@Param('id') id: string, @Body() body: any) {
    const { status, note } = body;
    const r = await this.prisma.pdplRequest.update({
      where: { id },
      data: { status: status || 'closed', note: note || null, resolvedAt: new Date() }
    });
    return { ok: true, request: r };
  }
}
