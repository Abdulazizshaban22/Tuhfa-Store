import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('spl')
export class SplController {
  @Post('validate')
  async validate(@Body() body:any){
    const addr = body?.address || {};
    if(process.env.DEMO_MODE==='true' || !process.env.SPL_API_KEY){
      const ok = !!(addr?.Buildingnumber && String(addr?.Zipcode||'').match(/^\d{5}$/));
      return { ok, provider:'demo' };
    }
    const params = new URLSearchParams({
      Buildingnumber: String(addr.Buildingnumber||''),
      Zipcode: String(addr.Zipcode||''),
      Additionalnumber: String(addr.Additionalnumber||''),
      encode: 'utf8'
    });
    const url = `https://api.address.gov.sa/verifyanaddress?${params.toString()}`;
    const r = await axios.get(url, { headers: { 'X-API-KEY': process.env.SPL_API_KEY } });
    return { ok: !!r.data?.Addressfound, raw: r.data };
  }
}
