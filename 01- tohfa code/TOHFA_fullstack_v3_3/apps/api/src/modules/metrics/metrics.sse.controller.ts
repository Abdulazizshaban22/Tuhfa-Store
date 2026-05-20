import { Controller, Sse } from '@nestjs/common';
import { interval, map } from 'rxjs';
import { MetricsService } from './metrics.service';
@Controller('metrics')
export class MetricsSseController {
  constructor(private metrics: MetricsService) {}
  @Sse('stream')
  stream(): any {
    return interval(2000).pipe(
      map(async () => ({ data: { time: Date.now(), text: await this.metrics.getRegistry().metrics() } }))
    ) as any;
  }
}
