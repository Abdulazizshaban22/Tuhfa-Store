import { Module } from '@nestjs/common';
import { AdminMetricsController } from './metrics.controller';

@Module({ controllers: [AdminMetricsController] })
export class AdminModule {}
