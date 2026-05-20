import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()
  list() { return this.orders.list(); }

  @Post()
  create(@Body() body: any) { return this.orders.create(body); }
}
