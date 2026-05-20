import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()
  list() { return this.orders.list(); }

  @Post()
  create(@Body() body: any) { return this.orders.create(body); }

  @Post('quick-buy')
  quick(@Query('productId') productId: string, @Query('qty') qty?: string) {
    return this.orders.quickBuy(String(productId), qty ? Number(qty) : 1);
  }
}
