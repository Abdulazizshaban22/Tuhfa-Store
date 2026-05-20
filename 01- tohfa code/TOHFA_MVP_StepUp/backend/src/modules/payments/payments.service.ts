import { Injectable } from '@nestjs/common';

type Provider = 'tap' | 'aps';

@Injectable()
export class PaymentsService {
  provider: Provider;
  constructor() {
    this.provider = (process.env.PAYMENTS_PROVIDER as Provider) || 'tap';
  }

  async createCheckout(amountSar: number, metadata: any) {
    const mockId = `chk_${Math.random().toString(36).slice(2,8)}`;
    return {
      provider: this.provider,
      checkoutId: mockId,
      checkoutUrl: `/mock/checkout/${mockId}`,
      amountSar,
      metadata,
    };
  }
}
