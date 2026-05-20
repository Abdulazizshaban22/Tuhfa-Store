import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeService } from '../payments/stripe.service';
import { TapService } from '../payments/tap.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaClient, private stripe: StripeService, private tap: TapService) {}

  async createOrder(data: { items: { productId: string; quantity: number }[]; provider?: 'stripe'|'tap'; returnUrl?: string }) {
    if (!data.items?.length) throw new BadRequestException('No items');
    const products = await this.prisma.product.findMany({ where: { id: { in: data.items.map(i => i.productId) } } });
    if (products.length !== data.items.length) throw new BadRequestException('Some products not found');

    const total = data.items.reduce((sum, it) => {
      const p = products.find(pp => pp.id === it.productId)!;
      return sum + p.priceCents * it.quantity;
    }, 0);

    // Create Order in DB (pending)
    const order = await this.prisma.order.create({
      data: {
        status: 'pending',
        totalCents: total,
        currency: 'SAR',
        items: {
          create: data.items.map(it => ({
            productId: it.productId,
            quantity: it.quantity,
            priceCents: products.find(p => p.id === it.productId)!.priceCents,
          })),
        },
      },
      include: { items: true },
    });

    // Payment link (choose provider)
    const provider = data.provider || (process.env.STRIPE_SECRET_KEY ? 'stripe' : 'tap');
    if (provider === 'stripe') {
      const line = order.items.map(it => {
        const p = products.find(pp => pp.id === it.productId)!;
        return { name: p.name, amount: it.priceCents, currency: 'sar', quantity: it.quantity };
      });
      const sess = await this.stripe.createCheckoutSession(line, (data.returnUrl || 'http://localhost:3000/thank-you') + '?ok=1', (data.returnUrl || 'http://localhost:3000/thank-you') + '?ok=0');
      await this.prisma.order.update({ where: { id: order.id }, data: { paymentProvider: 'stripe', paymentRef: sess.id } });
      return { orderId: order.id, payment: { provider: 'stripe', ...sess } };
    } else {
      const charge = await this.tap.createCharge(total / 100, `Order ${order.id}`, data.returnUrl || 'http://localhost:3000/thank-you', 'src_all');
      await this.prisma.order.update({ where: { id: order.id }, data: { paymentProvider: 'tap', paymentRef: charge.id || charge.reference?.transaction } });
      return { orderId: order.id, payment: { provider: 'tap', redirect_url: charge.transaction?.url or charge.redirect?.url } };
    }
  }
}
