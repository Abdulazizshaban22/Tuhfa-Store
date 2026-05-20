import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { SplService } from './spl.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService, private readonly spl: SplService) {}

  @Post('checkout')
  async checkout(@Body() body: any) {
    const { amountSar, address } = body;
    const addressOk = await this.spl.validateAddress(address);
    const session = await this.payments.createCheckout(amountSar, { addressOk });
    return { ...session, addressOk };
  }
}
