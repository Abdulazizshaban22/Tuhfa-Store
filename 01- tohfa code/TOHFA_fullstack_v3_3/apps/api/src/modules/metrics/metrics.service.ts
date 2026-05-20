import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';
@Injectable()
export class MetricsService {
  readonly registry = new Registry();
  readonly httpRequestsTotal: Counter<string>;
  readonly httpRequestDuration: Histogram<string>;
  readonly httpInFlight: Gauge<string>;
  constructor() {
    collectDefaultMetrics({ register: this.registry });
    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total HTTP requests',
      labelNames: ['method','route','status'],
      registers: [this.registry]
    });
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method','route','status'],
      buckets: [0.05,0.1,0.2,0.5,1,2,5],
      registers: [this.registry]
    });
    this.httpInFlight = new Gauge({
      name: 'http_in_flight_requests',
      help: 'In-flight requests',
      registers: [this.registry]
    });
  }
  getRegistry() { return this.registry; }
}
