import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

/**
 * Stripe webhook — production-ready
 * - Requires raw body for this route
 * - Verifies signature using STRIPE_WEBHOOK_SECRET
 */
@Controller('webhooks/stripe')
export class StripeWebhookFinalController {
  private prisma = new PrismaClient();
  private stripe: Stripe;
  private endpointSecret: string;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY as string;
    this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    if (!key || !this.endpointSecret) {
      throw new Error('Stripe keys missing: STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET');
    }
    this.stripe = new Stripe(key, { apiVersion: '2024-06-20' as any });
  }

  @Post()
  async handle(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') sig?: string) {
    try {
      const raw = (req as any).rawBody;
      if (!raw || !sig) return res.status(400).send('Missing raw body or signature');

      const event = this.stripe.webhooks.constructEvent(raw, sig, this.endpointSecret);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const ref = session.id;
        await this.prisma.order.updateMany({
          where: { paymentProvider: 'stripe', paymentRef: ref, status: { not: 'paid' } },
          data: { status: 'paid' },
        });
      } else if (event.type === 'payment_intent.succeeded') {
        const pi = event.data.object as Stripe.PaymentIntent;
        const ref = pi.id;
        await this.prisma.order.updateMany({
          where: { paymentProvider: 'stripe', paymentRef: ref, status: { not: 'paid' } },
          data: { status: 'paid' },
        });
      }
      return res.json({ received: true });
    } catch (err: any) {
      return res.status(400).send(`Stripe Webhook Error: ${err.message}`);
    }
  }
}
