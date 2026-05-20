import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable() export class ApsService {
  base = 'https://sbpaymentservices.amazon.com';
  apiKey = process.env.APS_API_KEY || '';

  async createPayment(amountSar: number, metadata: any){
    // Minimal placeholder; integrate per APS docs (create checkout/session then capture)
    // Here we just return a mock linking to APS quick start references
    return {
      provider: 'aps',
      status: 'INITIATED',
      amountSar,
      note: 'Integrate APS per docs (create checkout/session -> authorize/capture)',
      docs: 'https://paymentservices.amazon.com/docs/',
      metadata
    };
  }
}
