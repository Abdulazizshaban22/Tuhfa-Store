import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, WebhookProvider } from '@prisma/client';

@Injectable()
export class WebhookEventsService {
  private prisma = new PrismaClient();
  private logger = new Logger(WebhookEventsService.name);

  async logReceived(provider: WebhookProvider, type: string, payload: any, opts?: { signature?: string; deliveryId?: string; orderId?: string; sourceIp?: string; headers?: any }) {
    const { signature, deliveryId, orderId, sourceIp, headers } = opts || {};
    try {
      const ev = await this.prisma.webhookEvent.create({
        data: { provider, type, payload, signature, deliveryId, orderId, status: 'received', sourceIp, headers },
      });
      return ev;
    } catch (e: any) {
      if (deliveryId) {
        const existing = await this.prisma.webhookEvent.findUnique({ where: { deliveryId } }).catch(() => null);
        if (existing) return existing;
      }
      throw e;
    }
  }

  async get(id: string) {
    return this.prisma.webhookEvent.findUnique({ where: { id } });
  }

  async list(limit = 50) {
    return this.prisma.webhookEvent.findMany({ orderBy: { receivedAt: 'desc' }, take: limit });
  }
}
