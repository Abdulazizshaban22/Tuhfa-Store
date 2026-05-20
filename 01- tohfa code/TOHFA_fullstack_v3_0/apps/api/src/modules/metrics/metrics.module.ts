import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MetricsSseController } from './metrics.sse.controller';

@Module({
  providers: [MetricsService],
  controllers: [MetricsController, MetricsSseController],
  exports: [MetricsService]
})
export class MetricsModule {}
