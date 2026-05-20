import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe | null = null;
  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key) this.stripe = new Stripe(key, { apiVersion: '2024-06-20' as any });
  }

  async createCheckoutSession(lineItems: { name: string; amount: number; currency?: string; quantity?: number }[], successUrl: string, cancelUrl: string) {
    if (!this.stripe) throw new Error('Stripe not configured');
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems.map(li => ({
        price_data: {
          currency: li.currency || 'sar',
          product_data: { name: li.name },
          unit_amount: li.amount,
        },
        quantity: li.quantity || 1,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return { id: session.id, url: session.url };
  }
}
