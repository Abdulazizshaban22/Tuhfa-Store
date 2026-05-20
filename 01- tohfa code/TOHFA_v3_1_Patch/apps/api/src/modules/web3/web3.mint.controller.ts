import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Web3MintService } from './web3.mint.service';

@Controller('web3')
export class Web3MintController {
  constructor(private readonly svc: Web3MintService){}

  @Post('nft/:externalId/mint')
  async mint(@Param('externalId') externalId: string, @Body() body: any){
    const to = body?.ownerAddress;
    if(!to) return { ok:false, error:'ownerAddress required' };
    try { return await this.svc.mintForProduct(externalId, to); }
    catch(e:any){ return { ok:false, error: e?.message || 'MINT_FAILED' } }
  }

  @Get('nft/:externalId/owner')
  async owner(@Param('externalId') externalId: string){
    try { return await this.svc.ownerOfToken(externalId); }
    catch(e:any){ return { ok:false, error: e?.message || 'OWNER_FAILED' } }
  }
}
