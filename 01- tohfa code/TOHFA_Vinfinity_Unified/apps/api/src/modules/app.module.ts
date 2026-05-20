import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ProductsController } from './products.controller';
import { Web3MintController } from './web3.mint.controller';
import { SplController } from './spl.controller';
import { IiifController } from './iiif.controller';

@Module({
  controllers:[HealthController, ProductsController, Web3MintController, SplController, IiifController],
  providers:[]
})
export class AppModule {}
