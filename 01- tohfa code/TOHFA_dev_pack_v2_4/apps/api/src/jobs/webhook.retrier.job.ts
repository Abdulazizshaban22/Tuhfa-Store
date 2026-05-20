import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { SlackAlertsService } from '../alerts/slack.service';

function nextDelayMs(attempt: number) {
  // 0: now, 1: 1m, 2: 5m, 3: 15m, 4: 30m, 5: 2h, 6+: 6h
  const table = [0, 60e3, 5*60e3, 15*60e3, 30*60e3, 2*60*60e3, 6*60*60e3];
  return table[Math.min(attempt, table.length-1)];
}

@Injectable()
export class WebhookRetrierJob {
  private prisma = new PrismaClient();
  private logger = new Logger(WebhookRetrierJob.name);

  constructor(private alerts: SlackAlertsService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handle() {
    const now = Date.now();
    const events = await this.prisma.webhookEvent.findMany({
      where: { OR: [{ status: 'received' }, { status: 'failed' }] },
      orderBy: { receivedAt: 'asc' },
      take: 50,
    });

    for (const ev of events) {
      const delay = nextDelayMs(ev.attemptCount);
      const last = ev.lastAttemptAt ? ev.lastAttemptAt.getTime() : ev.receivedAt.getTime();
      if (now - last < delay) continue;

      try {
        await this.prisma.webhookEvent.update({ where: { id: ev.id }, data: { status: 'processing', attemptCount: { increment: 1 }, lastAttemptAt: new Date() } });

        // minimal processor: if event refers to order/paymentRef — refresh order status from DB only
        // (do not call provider APIs in retrier to avoid rate limits; rely on webhook semantics)
        if (ev.orderId) {
          const order = await this.prisma.order.findUnique({ where: { id: ev.orderId } });
          if (order && order.status === 'paid') {
            await this.prisma.webhookEvent.update({ where: { id: ev.id }, data: { status: 'processed', processedAt: new Date(), errorText: null } });
            continue;
          }
        }
        // If no concrete processing to do, mark processed to avoid loops
        await this.prisma.webhookEvent.update({ where: { id: ev.id }, data: { status: 'processed', processedAt: new Date(), errorText: null } });
      } catch (e: any) {
        await this.prisma.webhookEvent.update({ where: { id: ev.id }, data: { status: 'failed', errorText: e?.message || 'unknown' } });
        if (ev.attemptCount >= 4) {
          await this.alerts.notify(`⚠️ Webhook retry failing (#${ev.attemptCount}) — ${ev.provider} ${ev.type}
${e?.message || ''}`);
        }
      }
    }
  }
}
