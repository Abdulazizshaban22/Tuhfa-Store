import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private metrics: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = (req?.method || 'GET').toUpperCase();
    const route = req?.route?.path || req?.originalUrl || 'unknown';
    this.metrics.httpInFlight.inc();

    const start = process.hrtime.bigint();
    return next.handle().pipe(
      tap({
        next: () => this.observe('200'),
        error: () => this.observe('500'),
        complete: () => {}
      })
    );

    function secDiff(a: bigint, b: bigint) {
      const ns = Number(a - b);
      return ns / 1e9;
    }

    const self = this;
    function observe(status: string) {
      try {
        const end = process.hrtime.bigint();
        const dur = Number(end - start) / 1e9;
        self.metrics.httpInFlight.dec();
        self.metrics.httpRequestsTotal.inc({ method, route, status });
        self.metrics.httpRequestDuration.observe({ method, route, status }, dur);
      } catch {}
    }
  }
}
