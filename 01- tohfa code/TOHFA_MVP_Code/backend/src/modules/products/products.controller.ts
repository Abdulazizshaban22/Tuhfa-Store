import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get()
  list(@Query('q') q?: string, @Query('craft') craftTypeCode?: string, @Query('take') take = '20', @Query('skip') skip = '0') {
    return this.svc.findMany({ q, craftTypeCode, take: parseInt(take,10), skip: parseInt(skip,10) });
  }

  @Get(':externalId')
  get(@Param('externalId') externalId: string) {
    return this.svc.findByExternalId(externalId);
  }
}
