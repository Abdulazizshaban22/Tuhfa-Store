import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ProductsModule } from './products/products.module';
import { ArtisansModule } from './artisans/artisans.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { PaymentsModule } from './payments/payments.module';
import { SplModule } from './spl/spl.module';
import { IiifModule } from './iiif/iiif.module';
import { ResolverModule } from './resolver/resolver.module';
import { Web3Module } from './web3/web3.module';
import { PdplModule } from './pdpl/pdpl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ProductsModule, ArtisansModule, ExhibitsModule,
    PaymentsModule, SplModule, IiifModule, ResolverModule,
    Web3Module, PdplModule
  ],
})
export class AppModule {}
