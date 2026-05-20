import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('admin/metrics')
export class AdminMetricsWindowsController {
  private prisma = new PrismaClient();

  @Get('windows')
  async windows() {
    const now = new Date();
    const m5  = new Date(now.getTime() - 5*60*1000);
    const h1  = new Date(now.getTime() - 60*60*1000);
    const d1  = new Date(now.getTime() - 24*60*60*1000);

    const [orders5, orders1h, orders24h, whFail5, whFail1h, whFail24h] = await Promise.all([
      this.prisma.order.count({ where: { status: 'paid', createdAt: { gte: m5 } } }),
      this.prisma.order.count({ where: { status: 'paid', createdAt: { gte: h1 } } }),
      this.prisma.order.count({ where: { status: 'paid', createdAt: { gte: d1 } } }),
      this.prisma.webhookEvent.count({ where: { status: 'failed', receivedAt: { gte: m5 } } }),
      this.prisma.webhookEvent.count({ where: { status: 'failed', receivedAt: { gte: h1 } } }),
      this.prisma.webhookEvent.count({ where: { status: 'failed', receivedAt: { gte: d1 } } }),
    ]);

    return {
      orders: { paid_5m: orders5, paid_1h: orders1h, paid_24h: orders24h },
      webhooks: { failed_5m: whFail5, failed_1h: whFail1h, failed_24h: whFail24h },
      ts: now.toISOString(),
    };
  }
}
