import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma.module';
import { OrdersModule } from './orders/orders.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MetricsModule } from './metrics/metrics.module';
import { FlagsModule } from './flags/flags.module';
import { ReportsModule } from './reports/reports.module';
import { AdminModule } from './admin/admin.module';
import { Web3Module } from './web3/web3.module';
import { PdplModule } from './pdpl/pdpl.module';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    OrdersModule,
    WebhooksModule,
    MetricsModule,
    FlagsModule,
    ReportsModule,
    AdminModule,
    Web3Module,
    PdplModule,
    NotifierModule
  ]
})
export class AppModule {}
