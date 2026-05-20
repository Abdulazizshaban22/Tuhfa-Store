import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable() export class SplService {
  base = process.env.SPL_BASE || 'https://api.address.gov.sa';
  apiKey = process.env.SPL_API_KEY || '';
  async validateAddress(addr: any){
    try {
      if(!this.apiKey) return { ok: false, reason: 'NO_API_KEY' };
      const res = await axios.get(`${this.base}/v3/address/validate`, {
        headers: { 'X-API-KEY': this.apiKey },
        params: { address: JSON.stringify(addr) },
        timeout: 5000,
      });
      return { ok: res.status === 200, data: res.data };
    } catch(e: any){
      return { ok: false, reason: e?.message || 'SPL_ERROR' };
    }
  }
}
