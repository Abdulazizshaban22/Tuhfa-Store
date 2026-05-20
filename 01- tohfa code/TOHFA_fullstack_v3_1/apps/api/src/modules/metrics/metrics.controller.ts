import { Controller, Get, Header } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metrics: MetricsService) {}
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  async plain() { return await this.metrics.getRegistry().metrics(); }
}
