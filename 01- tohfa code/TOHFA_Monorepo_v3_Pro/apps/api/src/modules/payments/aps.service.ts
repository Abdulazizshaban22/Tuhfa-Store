import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable() export class ApsService {
  base = 'https://sbpaymentservices.amazon.com';
  apiKey = process.env.APS_API_KEY || '';
  async createPayment(amountSar: number, metadata: any){
    return { provider:'aps', status:'INITIATED', amountSar, note:'Integrate APS authorize/capture per docs', docs:'https://paymentservices.amazon.com/docs/', metadata };
  }
}
