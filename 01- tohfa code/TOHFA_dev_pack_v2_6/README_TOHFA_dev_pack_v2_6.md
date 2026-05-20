# TOHFA_dev_pack_v2_6 — Prometheus /metrics + Filters + Audit + Sales PDF

## ما الجديد؟
- **/metrics** بنسق Prometheus (prom-client) + Interceptor يقيس المدد/الطلبات.
- **فلاتر ويبهوك متقدمة** على API + واجهة إدارة.
- **AuditLog** يسجّل أفعال الإدارة.
- **تقرير PDF للمبيعات** آخر 30 يوم (pdfkit).

## الربط السريع
1) Prisma:
```bash
# أضِف audit log إلى schema.prisma
cat apps/api/prisma/schema.auditlog.patch.prisma
pnpm prisma migrate dev
```
2) AppModule (مثال):
```ts
import { MetricsService } from './metrics/metrics.service';
import { MetricsController } from './metrics/metrics.controller';
import { HttpMetricsInterceptor } from './common/http.metrics.interceptor';
import { AdminAdvancedController } from './admin/admin.advanced.controller';

@Module({
  controllers: [MetricsController, AdminAdvancedController],
  providers: [MetricsService, { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor }],
})
export class AppModule {}
```
3) بيئة
```
NEXT_PUBLIC_API_BASE=http://localhost:3001
```
4) تثبيت الاعتمادات (server):
```
pnpm add prom-client pdfkit
```

## Prometheus Scrape
- المعيار: **text/plain; version=0.0.4** (Prometheus exposition format). Endpoint: `/metrics`، رجّع `registry.metrics()` كما يوصي **prom-client**.
- إن أردت التفاوض على الميديا، راجع وثائق Prometheus content negotiation.
- أدرج مثال scrape في Prometheus:
```yaml
scrape_configs:
  - job_name: 'tohfa-api'
    metrics_path: /metrics
    static_configs:
      - targets: ['api:3001']
```

## مراجع
- prom-client (Node.js): GitHub README — استخدام registry وmetrics().
- Prometheus exposition 0.0.4 + التفاوض (Accept).
- NestJS Terminus (اختياري) لقراءات health المتقدمة.
- Prisma Json (لـ headers/payload).
- Next.js (App Router) — جلب البيانات و/أو تعطيل الكاش (no-store).
- pdfkit — توليد PDF.
- Puppeteer — بديل HTML→PDF (إن رغبت لاحقًا).

— Built at: 2025-11-08T19:54:15.922829Z
