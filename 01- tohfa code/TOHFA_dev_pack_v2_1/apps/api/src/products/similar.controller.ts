import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsSimilarController {
  constructor(private service: ProductsService) {}

  @Get(':id/embed')
  async embed(@Param('id') id: string) {
    await this.service.ensureEmbedding(id);
    return { ok: true };
  }

  @Get(':id/similar')
  async similar(@Param('id') id: string, @Query('limit') limit?: string) {
    const n = Math.min(Math.max(parseInt(limit || '10', 10), 1), 50);
    const rows = await this.service.similar(id, n);
    return { items: rows };
  }
}
