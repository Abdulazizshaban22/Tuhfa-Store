/**
 * Patch for OrdersService — idempotency and stable references
 * - Stripe: pass idempotencyKey (e.g., order.id) in createCheckoutSession
 * - Tap: use reference.merchant = order.id and treat duplicates as no-op
 */
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeServicePatch } from '../payments/stripe.service.patch';
import { TapServicePatch } from '../payments/tap.service.patch';

@Injectable()
export class OrdersServicePatch {
  constructor(private prisma: PrismaClient, private stripe: StripeServicePatch, private tap: TapServicePatch) {}

  async createOrderIdempotent(data: { items: { productId: string; quantity: number }[]; provider?: 'stripe'|'tap'; returnUrl?: string }) {
    if (!data.items?.length) throw new BadRequestException('No items');

    const products = await this.prisma.product.findMany({ where: { id: { in: data.items.map(i => i.productId) } } });
    if (products.length !== data.items.length) throw new BadRequestException('Some products not found');

    const total = data.items.reduce((sum, it) => {
      const p = products.find(pp => pp.id === it.productId)!;
      return sum + p.priceCents * it.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: { status: 'pending', totalCents: total, currency: 'SAR', items: { create: data.items.map(i => ({ productId: i.productId, quantity: i.quantity, priceCents: products.find(p => p.id === i.productId)!.priceCents })) } },
      include: { items: true },
    });

    const provider = data.provider || (process.env.STRIPE_SECRET_KEY ? 'stripe' : 'tap');
    const returnUrl = data.returnUrl || 'http://localhost:3000/thank-you';

    if (provider === 'stripe') {
      const line = order.items.map(it => {
        const p = products.find(pp => pp.id === it.productId)!;
        return { name: p.name, amount: it.priceCents, currency: 'sar', quantity: it.quantity };
      });
      const sess = await this.stripe.createCheckoutSession(line, returnUrl + '?ok=1', returnUrl + '?ok=0', order.id /* idempotencyKey */);
      await this.prisma.order.update({ where: { id: order.id }, data: { paymentProvider: 'stripe', paymentRef: sess.id } });
      return { orderId: order.id, payment: { provider: 'stripe', ...sess } };
    } else {
      const charge = await this.tap.createChargeWithRef(total / 100, `Order ${order.id}`, returnUrl, 'src_all', order.id);
      await this.prisma.order.update({ where: { id: order.id }, data: { paymentProvider: 'tap', paymentRef: charge.id || charge.reference?.transaction } });
      return { orderId: order.id, payment: { provider: 'tap', redirect_url: charge.transaction?.url || charge.redirect?.url } };
    }
  }
}
