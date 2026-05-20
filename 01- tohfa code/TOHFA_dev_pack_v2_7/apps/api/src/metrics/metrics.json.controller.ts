import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsJsonController {
  constructor(private metrics: MetricsService) {}

  @Get('json')
  async json() {
    const reg = this.metrics.getRegistry();
    const body = await (reg as any).getMetricsAsJSON();
    return body;
  }
}
