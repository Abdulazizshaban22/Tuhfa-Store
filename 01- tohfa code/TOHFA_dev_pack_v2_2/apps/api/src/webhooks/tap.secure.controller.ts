import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { verifyTapSignature } from './tap.verify';

/**
 * Secure Tap webhook controller with HMAC verification.
 * Ensure you pass raw body for this route as well, to avoid JSON mutation.
 */
@Controller('webhooks/tap-secure')
export class TapWebhookSecureController {
  private prisma = new PrismaClient();

  @Post()
  async handle(@Req() req: Request, @Res() res: Response, @Headers() headers: any, @Body() body: any) {
    try {
      const raw = (req as any).rawBody ?? JSON.stringify(body);
      const v = verifyTapSignature(raw, headers);
      if (!v.ok) return res.status(401).json({ error: 'invalid-signature', detail: v });

      // Process charge
      const charge = body?.object === 'charge' ? body : body?.charge || body;
      const status = (body?.status || body?.event || '').toString().toUpperCase();
      const paymentRef = charge?.id || charge?.reference?.transaction;
      const successLike = ['CAPTURED','CHARGED','SUCCEEDED','AUTHORIZED','CAPTURE_SUCCEEDED'].includes(status);

      if (successLike && paymentRef) {
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
