import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}
  @Get()
  list(@Query() q: any) {
    const { q:search, craft, region, patterns, materials, take='20', skip='0' } = q;
    const arr = (s?: string)=> (s||'').split(',').map((x:string)=>x.trim()).filter(Boolean);
    return this.svc.list({ q: search, craftTypeCode: craft, regionCode: region, patterns: arr(patterns), materials: arr(materials), take: parseInt(take,10), skip: parseInt(skip,10) });
  }
  @Get(':externalId') get(@Param('externalId') externalId: string) { return this.svc.byExternalId(externalId); }
  @Get(':externalId/recommendations') recs(@Param('externalId') externalId: string, @Query('k') k?: string) {
    return this.svc.recommendations(externalId, k ? parseInt(k,10): 8);
  }
}
