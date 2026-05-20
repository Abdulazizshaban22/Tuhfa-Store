import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import * as client from 'prom-client';

// Simple SSE that pushes a JSON snapshot every 2s
@Controller('admin/metrics')
export class MetricsSseController {
  private registry = client.register;

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return interval(2000).pipe(
      map(async () => {
        const txt = await this.registry.metrics();
        return { data: { time: Date.now(), text: txt } };
      }),
      // unwrap nested promise -> naive helper
      map(async v => await v) as any
    );
  }
}
