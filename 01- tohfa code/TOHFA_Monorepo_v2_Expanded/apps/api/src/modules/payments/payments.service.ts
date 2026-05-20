import { Injectable } from '@nestjs/common';
import { TapService } from './tap.service';
import { ApsService } from './aps.service';

type Provider = 'tap' | 'aps';

@Injectable() export class PaymentsService {
  constructor(private tap: TapService, private aps: ApsService){}
  provider: Provider = (process.env.PAYMENTS_PROVIDER as Provider) || 'tap';

  async createCheckout(amountSar: number, metadata: any, method: 'mada'|'apple'|'hosted'='hosted'){
    if(this.provider === 'tap'){
      return this.tap.createCharge(amountSar, metadata, method);
    } else {
      return this.aps.createPayment(amountSar, metadata);
    }
  }
}
