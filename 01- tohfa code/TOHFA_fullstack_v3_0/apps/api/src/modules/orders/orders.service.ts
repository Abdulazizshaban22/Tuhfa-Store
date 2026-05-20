import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaClient) {}

  list() {
    return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  }

  async create(payload: any) {
    // simplified order create
    return this.prisma.order.create({
      data: {
        status: 'pending',
        totalCents: Math.round((payload.total || 0) * 100),
        currency: 'SAR',
        items: { create: (payload.items || []).map((i:any)=>({ productId: i.productId, quantity: i.quantity, unitCents: Math.round(i.unit * 100) })) }
      }
    });
  }
}
