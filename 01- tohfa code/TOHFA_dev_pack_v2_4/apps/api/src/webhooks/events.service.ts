import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, WebhookProvider } from '@prisma/client';

@Injectable()
export class WebhookEventsService {
  private prisma = new PrismaClient();
  private logger = new Logger(WebhookEventsService.name);

  async logReceived(provider: WebhookProvider, type: string, payload: any, signature?: string, deliveryId?: string, orderId?: string) {
    try {
      const ev = await this.prisma.webhookEvent.create({
        data: { provider, type, payload, signature, deliveryId, orderId, status: 'received' },
      });
      return ev;
    } catch (e: any) {
      // deliveryId unique may conflict—upsert by deliveryId
      if (deliveryId) {
        const existing = await this.prisma.webhookEvent.findUnique({ where: { deliveryId } }).catch(() => null);
        if (existing) return existing;
      }
      throw e;
    }
  }

  async markProcessing(id: string) {
    await this.prisma.webhookEvent.update({ where: { id }, data: { status: 'processing', attemptCount: { increment: 1 }, lastAttemptAt: new Date() } });
  }

  async markProcessed(id: string) {
    await this.prisma.webhookEvent.update({ where: { id }, data: { status: 'processed', processedAt: new Date(), errorText: null } });
  }

  async markFailed(id: string, errorText: string) {
    await this.prisma.webhookEvent.update({ where: { id }, data: { status: 'failed', errorText } });
  }

  async list(limit = 50) {
    return this.prisma.webhookEvent.findMany({
      orderBy: { receivedAt: 'desc' },
      take: limit,
    });
  }
}
