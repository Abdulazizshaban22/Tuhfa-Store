import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ProductsModule } from './products/products.module';
import { ArtisansModule } from './artisans/artisans.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ArtisansModule,
    ExhibitsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
