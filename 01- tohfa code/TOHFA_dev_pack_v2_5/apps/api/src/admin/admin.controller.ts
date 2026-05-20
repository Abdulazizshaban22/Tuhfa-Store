import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebhookEventsService } from './events.service';
import { PrismaClient } from '@prisma/client';

@Controller('admin')
export class AdminController {
  private prisma = new PrismaClient();
  constructor(private svc: WebhookEventsService) {}

  @Get('webhooks')
  async list(@Query('limit') limit?: string) {
    const n = Math.min(Math.max(parseInt(limit || '50', 10), 1), 200);
    return this.svc.list(n);
  }

  @Get('webhooks/:id')
  async details(@Param('id') id: string) {
    const ev = await this.svc.get(id);
    return ev || { ok: false, error: 'not_found' };
  }

  @Get('metrics')
  async metrics() {
    const [ordersPaid, ordersPending, ordersFailed, whReceived, whProcessed, whFailed] = await Promise.all([
      this.prisma.order.count({ where: { status: 'paid' } }),
      this.prisma.order.count({ where: { status: 'pending' } }),
      this.prisma.order.count({ where: { status: 'failed' } }),
      this.prisma.webhookEvent.count({ where: { status: 'received' } }),
      this.prisma.webhookEvent.count({ where: { status: 'processed' } }),
      this.prisma.webhookEvent.count({ where: { status: 'failed' } }),
    ]);
    return {
      orders: { paid: ordersPaid, pending: ordersPending, failed: ordersFailed },
      webhooks: { received: whReceived, processed: whProcessed, failed: whFailed },
      ts: new Date().toISOString(),
    };
  }
}
