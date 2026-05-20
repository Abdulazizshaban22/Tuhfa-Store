import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class DemoPaymentsService {
  async createCheckout(amountSar: number, metadata: any, method: 'mada'|'apple'|'hosted'='hosted'){
    const id = uuidv4();
    const url = `https://sandbox.tap.company/redirect/${id}`;
    return { provider:'demo', status:'INITIATED', transactionUrl: url, amountSar, method, metadata, note:'DEMO_MODE' };
  }
}
