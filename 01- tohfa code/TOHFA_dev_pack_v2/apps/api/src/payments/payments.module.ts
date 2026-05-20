import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { TapService } from './tap.service';

@Module({
  providers: [StripeService, TapService],
  exports: [StripeService, TapService],
})
export class PaymentsModule {}
