import { Controller, Get, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('orders')
export class OrdersStatusController {
  private prisma = new PrismaClient();

  @Get(':id')
  async get(@Param('id') id: string) {
    const o = await this.prisma.order.findUnique({ where: { id } });
    if (!o) return { ok: false, error: 'not_found' };
    return {
      ok: true,
      id: o.id,
      status: o.status,
      paymentProvider: o.paymentProvider,
      paymentRef: o.paymentRef,
      totalCents: o.totalCents,
      currency: o.currency,
      createdAt: o.createdAt,
    };
  }
}
