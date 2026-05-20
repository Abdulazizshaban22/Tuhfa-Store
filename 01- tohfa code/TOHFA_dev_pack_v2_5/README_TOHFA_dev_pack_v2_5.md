# TOHFA_dev_pack_v2_5 — Admin Dash + Health + Webhook Details + UX

## ما الجديد؟
- توسيع نموذج **WebhookEvent** (`sourceIp`, `headers`).
- API: `/admin/webhooks` (قائمة) + `/admin/webhooks/:id` (تفاصيل).
- واجهات: `/admin/dashboard` (مؤشرات) + صفحة تفاصيل الحدث.
- Health: `/health/live` و`/health/ready` (فحص DB بسيط).
- Thank You محسّنة (AR/EN + حالات تفاعلية).

## الربط
1) ادمج `schema.webhookevent.v2_5.patch.prisma` ثم:
```bash
pnpm prisma migrate dev
```
2) AppModule:
```ts
import { WebhookEventsService } from '../webhooks/events.service';
import { AdminController } from '../admin/admin.controller';
import { HealthController } from '../health/health.controller';

@Module({
  controllers: [AdminController, HealthController],
  providers: [WebhookEventsService],
})
export class AppModule {}
```
3) الويب:
- `NEXT_PUBLIC_API_BASE` مطلوب لصفحات `/admin/*` و`/thank-you`.

## مراجع وتنبيهات
- **Stripe Webhooks** يتطلب **raw body + Stripe-Signature + constructEvent** (وثائق Stripe).
- **Tap Webhooks**: لديهم توثيق للويبهوكات والتنبيهات؛ احرص على التحقق من **HMAC** حسب إعداد حسابك.
- **@nestjs/schedule** لإدارة الجداول (استخدمناه سابقًا في retrier).
- **Slack Incoming Webhooks** لإرسال تنبيهات.
- **Prisma Json** لحقول `payload/headers`.
- **pgvector (HNSW + cosine)** لميزة “قطع مشابهة”.

— Built at: 2025-11-08T19:51:51.542772Z
