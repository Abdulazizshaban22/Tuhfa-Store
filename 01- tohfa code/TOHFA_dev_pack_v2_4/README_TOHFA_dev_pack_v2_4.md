# TOHFA_dev_pack_v2_4 — Status + Webhook Logging/Retry + Alerts + Thank You

## ما الجديد؟
- **/orders/:id**: يُرجع حالة الطلب (paid/pending/failed…).
- **Thank You Page**: تتبع آلي للحالة (poll/3s) وتعرض رقم الطلب.
- **WebhookEvent**: نموذج Prisma لتخزين كل الأحداث (payload JSON + توقيع + مرجع التوصيل).
- **Retrier Job**: جدولة كل دقيقة مع backoff (1m/5m/15m/30m/2h/6h).
- **Slack Alerts**: إشعارات عند فشل متكرر.
- **Admin UI**: صفحة بسيطة لمراجعة الأحداث.

## ربط سريع
1) ادمج `schema.webhookevent.patch.prisma` في `schema.prisma` ثم:
```bash
pnpm prisma migrate dev
```
2) AppModule:
```ts
import { OrdersStatusController } from './orders/orders.status.controller';
import { AdminWebhooksController } from './webhooks/admin.webhooks.controller';
import { WebhookEventsService } from './webhooks/events.service';
import { WebhookRetrierJob } from './jobs/webhook.retrier.job';
import { SlackAlertsService } from './alerts/slack.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({ 
  imports: [ScheduleModule.forRoot()],
  controllers: [OrdersStatusController, AdminWebhooksController],
  providers: [WebhookEventsService, WebhookRetrierJob, SlackAlertsService],
})
export class AppModule {}
```
3) البيئة:
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```
4) الويب:
- صفحة الشكر: `apps/web/app/thank-you/page.tsx` (تحتاج `NEXT_PUBLIC_API_BASE`).
- عدّل صفحة الدفع (مرفقة) لتخزين `last_order_id` وإرفاق order في ريديركت Stripe.

## ملاحظات عملية
- **Stripe Webhooks** تتطلب raw body + توقيع `Stripe-Signature` (انظر التوثيق الرسمي).
- **Idempotency**: Stripe يدعم `Idempotency-Key` رسميًا؛ استخدمناه في v2.3.
- **Tap Webhooks**: تحقق من ترويسة التوقيع (HMAC) قبل المعالجة، ومرر `reference.merchant=order.id`.
- **pgvector (cosine/HNSW)** مستخدم لميزة “مشابه”.
- **Prisma JSON**: نموذج `WebhookEvent.payload` يستخدم النوع Json.

— Built at: 2025-11-08T19:49:05.622002Z
