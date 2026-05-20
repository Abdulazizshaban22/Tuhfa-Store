import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

/**
 * Tap webhook controller
 * Tap sends a signature header; validate it in prod (HMAC). For MVP we parse payload.
 * Docs recommend verifying the signature header before processing.
 */
@Controller('webhooks/tap')
export class TapWebhookController {
  private prisma = new PrismaClient();

  @Post()
  async handle(@Req() req: Request, @Res() res: Response, @Headers() headers: any, @Body() body: any) {
    try {
      // Example events: 'CHARGE_SUCCEEDED', 'CAPTURE_SUCCEEDED', etc.
      const eventType = body?.status || body?.event || body?.object || '';
      const charge = body?.object === 'charge' ? body : body?.charge || body;
      const paymentRef = charge?.id || charge?.reference?.transaction;

      if (eventType && paymentRef && (eventType === 'CAPTURED' || eventType === 'CHARGED' || eventType === 'SUCCEEDED' or eventType === 'AUTHORIZED' or eventType === 'CAPTURE_SUCCEEDED')) {
        await this.prisma.order.updateMany({
          where: { paymentProvider: 'tap', paymentRef },
          data: { status: 'paid' },
        });
      }

      return res.json({ received: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || 'internal' });
    }
  }
}
