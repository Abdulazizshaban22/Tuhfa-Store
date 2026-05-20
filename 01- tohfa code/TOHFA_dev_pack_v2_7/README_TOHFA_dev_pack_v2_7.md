# TOHFA_dev_pack_v2_7 — Metrics JSON + Charts Dashboard + Detailed PDF + Alerts

## الجديد
- **/metrics/json**: يعيد JSON من `register.getMetricsAsJSON()` لاستخدامات داخلية/تشخيص.
- **تنبيهات معدل الأخطاء**: Job كل دقيقة يرسل إلى Slack عند ارتفاع 5xx في آخر 1/5 دقائق.
- **لوحة رسوم**: `/admin/dashboard` محدثة — رسوم Line عبر Chart.js لطلبات مدفوعة وويبهوكات فاشلة لآخر 14 يوم.
- **/admin/metrics/daily**: بيانات يومية 14 يوم (Orders/Webhooks).
- **تقرير PDF مفصل**: `sales-detailed.pdf` عبر Puppeteer (HTML→PDF) مع `emulateMediaType('screen')`.

## التثبيت
```bash
pnpm add chart.js react-chartjs-2 puppeteer
# خادم الـAPI يملك مسبقًا prom-client و pdfkit من الإصدارات السابقة
```

## الربط السريع
- فعّل `ScheduleModule.forRoot()` إن لم يكن مفعلًا، ثم سجّل:
  - `MetricsAlertsJob` (من apps/api/src/metrics/metrics.alerts.job.ts)
  - أضف `HttpMetricsInterceptor` العالمي (نسخة v2.7 التي تسجل 5xx).
- أضف الكنترولرز:
  - Metrics: `MetricsJsonController`
  - Admin metrics daily: `AdminMetricsController`
  - Reports: `SalesDetailedPdfController`

## البيئة
```
SLACK_WEBHOOK_URL=...
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

## ملاحظات
- prom-client يدعم `registry.metrics()` للنص و`register.getMetricsAsJSON()` لهيئة JSON.
- تنسيق نص Prometheus يجب أن يقدَّم كـ `text/plain; version=0.0.4`، مع تفاوض `Accept` عند اللزوم.
- Chart.js عبر react-chartjs-2 لرسوم الويب.
- Puppeteer `page.pdf()` و`emulateMediaType('screen')` لتحكم أفضل بالألوان والطباعة.
- جدولة NestJS عبر `@nestjs/schedule` (CronExpression).

— Built at: 2025-11-08T19:57:00.070109Z
