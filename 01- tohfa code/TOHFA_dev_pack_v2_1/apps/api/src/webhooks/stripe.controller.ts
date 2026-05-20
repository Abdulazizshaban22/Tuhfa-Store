import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import type { Request, Response } from 'express';

/**
 * Stripe webhook controller
 * Requires raw body access in NestJS (add a raw body parser on bootstrap).
 * See README for instructions.
 */
@Controller('webhooks/stripe')
export class StripeWebhookController {
  private prisma = new PrismaClient();
  private stripe: Stripe | null = null;
  private endpointSecret: string | undefined;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) this.stripe = new Stripe(key, { apiVersion: '2024-06-20' as any });
    this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  }

  @Post()
  async handle(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') sig?: string) {
    // If no secret, skip verification in dev (not recommended for prod)
    let event: Stripe.Event;
    try {
      if (this.stripe && this.endpointSecret && sig && (req as any).rawBody) {
        event = this.stripe.webhooks.constructEvent((req as any).rawBody, sig, this.endpointSecret);
      } else {
        // Fallback without verification (dev only)
        event = req.body as any;
      }
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const paymentRef = session.id;
          await this.prisma.order.updateMany({
            where: { paymentProvider: 'stripe', paymentRef },
            data: { status: 'paid' },
          });
          break;
        }
        case 'payment_intent.succeeded': {
          const pi = event.data.object as Stripe.PaymentIntent;
          const paymentRef = pi.id;
          await this.prisma.order.updateMany({
            where: { paymentProvider: 'stripe', paymentRef },
            data: { status: 'paid' },
          });
          break;
        }
        default:
          // ignore other events for now
          break;
      }
      return res.json({ received: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || 'internal' });
    }
  }
}
