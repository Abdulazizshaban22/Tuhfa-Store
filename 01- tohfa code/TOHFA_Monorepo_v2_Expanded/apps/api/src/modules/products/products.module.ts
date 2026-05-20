import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEmbeddingController } from './embedding.controller';

@Module({ controllers:[ProductsController, ProductEmbeddingController], providers:[ProductsService] })
export class ProductsModule {}
