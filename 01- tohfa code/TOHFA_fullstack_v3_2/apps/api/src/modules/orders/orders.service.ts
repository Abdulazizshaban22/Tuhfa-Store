import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaClient) {}

  list() {
    return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  }

  async create(payload: any) {
    return this.prisma.order.create({
      data: {
        status: 'pending',
        totalCents: Math.round((payload.total || 0) * 100),
        currency: 'SAR',
        items: { create: (payload.items || []).map((i:any)=>({ productId: i.productId, quantity: i.quantity, unitCents: Math.round(i.unit * 100) })) }
      }
    });
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
    return order;
  }
}
