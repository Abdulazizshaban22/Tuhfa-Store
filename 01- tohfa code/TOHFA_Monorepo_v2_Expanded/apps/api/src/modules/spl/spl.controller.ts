import { Body, Controller, Post } from '@nestjs/common';
import { SplService } from './spl.service';
@Controller('spl') export class SplController {
  constructor(private readonly spl: SplService){}
  @Post('validate') async validate(@Body() body: any){
    const res = await this.spl.validateAddress(body?.address);
    return res;
  }
}
