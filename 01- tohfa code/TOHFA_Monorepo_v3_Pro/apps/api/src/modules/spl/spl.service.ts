import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable() export class SplService {
  base = process.env.SPL_BASE || 'https://api.address.gov.sa';
  apiKey = process.env.SPL_API_KEY || '';
  async validateAddress(addr: any){
    try {
      if(!this.apiKey) return { ok:false, reason:'NO_API_KEY' };
      const res = await axios.get(`${this.base}/verifyanaddress`, { params: addr, headers:{ 'X-API-KEY': this.apiKey }, timeout: 8000 });
      return { ok: res.status===200, data: res.data };
    } catch(e:any){ return { ok:false, reason: e?.message || 'SPL_ERROR' }; }
  }
}
