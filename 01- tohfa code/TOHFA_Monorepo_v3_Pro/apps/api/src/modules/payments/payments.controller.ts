import { Body, Controller, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
@Controller('payments') export class PaymentsController {
  constructor(private readonly payments: PaymentsService){}
  @Post('checkout') async checkout(@Body() body: any, @Query('method') method?: string){
    const { amountSar, address, customer } = body;
    const session = await this.payments.createCheckout(amountSar, { address, customer }, (method as any) || 'hosted');
    return session;
  }
}
