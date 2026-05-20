import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NotifierService } from '../notifier/notifier.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaClient, private notifier: NotifierService) {}

  list() {
    return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  }

  async create(payload: any) {
    const order = await this.prisma.order.create({
      data: {
        status: payload.status || 'pending',
        totalCents: Math.round((payload.total || 0) * 100),
        currency: payload.currency || 'SAR',
        buyerAddress: payload.buyerAddress || null,
        signature: payload.signature || null,
        nonce: payload.nonce || null,
        items: { create: (payload.items || []).map((i:any)=>({ productId: i.productId, quantity: i.quantity, unitCents: Math.round(i.unit * 100) })) }
      }
    });
    await this.notifier.slack(`🧾 New Order ${order.id} — SAR ${(order.totalCents/100).toFixed(2)} — status: ${order.status}`);
    return order;
  }

  async quickBuy(productId: string, quantity: number = 1) {
    const p = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!p) throw new Error('Product not found');
    const total = p.priceCents * quantity;
    const order = await this.prisma.order.create({
      data: {
        status: 'pending',
        totalCents: total,
        currency: p.currency,
        items: { create: [{ productId: p.id, quantity, unitCents: p.priceCents }] }
      }
    });
    await this.notifier.slack(`⚡ Quick-Buy Order ${order.id} — ${quantity} × ${p.name} — SAR ${(order.totalCents/100).toFixed(2)}`);
    return order;
  }
}
