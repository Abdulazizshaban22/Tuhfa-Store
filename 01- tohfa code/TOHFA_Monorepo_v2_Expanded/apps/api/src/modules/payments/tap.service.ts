import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
type Method = 'mada'|'apple'|'hosted';

@Injectable() export class TapService {
  base = 'https://api.tap.company/v2';
  secret = process.env.TAP_SECRET_KEY || '';
  merchantId = process.env.TAP_MERCHANT_ID || '';

  async createCharge(amountSar: number, metadata: any, method: Method){
    const idempotency = uuidv4();
    const sourceId = method === 'mada' ? 'src_sa.mada' : method === 'apple' ? 'src_apple_pay' : 'src_all';
    const payload = {
      amount: amountSar,
      currency: 'SAR',
      threeDSecure: true,
      customer_initiated: true,
      description: 'TOHFA charge',
      metadata,
      customer: metadata?.customer || undefined,
      merchant: this.merchantId ? { id: this.merchantId } : undefined,
      source: { id: sourceId },
      redirect: { url: metadata?.redirectUrl || 'https://example.com/payments/redirect' },
      post: { url: metadata?.postUrl || 'https://example.com/payments/webhook' }
    };
    const res = await axios.post(`${this.base}/charges`, payload, {
      headers: {
        Authorization: `Bearer ${this.secret}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotency,
      },
      timeout: 10000,
    });
    const data = res.data;
    // For hosted/redirect methods, Tap returns transaction.url
    return {
      provider: 'tap',
      status: data.status,
      chargeId: data.id,
      transactionUrl: data?.transaction?.url,
      response: data?.response,
    };
  }
}
