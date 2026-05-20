import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class TapService {
  private key = process.env.TAP_SECRET_KEY || '';
  private merchant = process.env.TAP_MERCHANT_ID || '';
  private endpoint = 'https://api.tap.company/v2/charges';

  async createCharge(amount: number, description: string, returnUrl: string, sourceId: string = 'src_all') {
    if (!this.key || !this.merchant) throw new Error('Tap not configured');
    const body = {
      amount,
      currency: 'SAR',
      description,
      threeDSecure: true,
      save_card: false,
      statement_descriptor: 'TOHFA',
      metadata: { platform: 'TOHFA' },
      reference: { merchant: this.merchant },
      receipt: { email: false, sms: false },
      customer_initiated: true,
      redirect: { url: returnUrl },
      source: { id: sourceId }, // e.g., 'src_sa.stcpay' for STC Pay
    };
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.key },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return json;
  }
}
