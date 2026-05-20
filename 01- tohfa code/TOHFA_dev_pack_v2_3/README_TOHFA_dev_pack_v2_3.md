# TOHFA_dev_pack_v2_3 — Production Ready Polish

## جديد v2.3
- Stripe Webhook (تحقق توقيع عبر constructEvent + raw body).
- Idempotency: Stripe (idempotencyKey), Tap (reference.merchant).
- Postman Collection + cURL.
- "Similar" مع Skeleton وحقل لغة.
- فهرس جزئي فريد لـ paymentRef (اختياري).

## توصيل raw body
```ts
import * as bodyParser from 'body-parser';
app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));
app.use('/webhooks/tap-secure', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());
```

## AppModule
- استبدل `StripeWebhookFinalController` بدل السابق.
- استخدم الخدمات patch أو ادمج الإضافات في خدماتك.

## بيئة
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
TAP_SECRET_KEY=sk_test_...
TAP_MERCHANT_ID=merchant_...
TAP_WEBHOOK_SECRET=your_hmac_secret
AI_BASE=http://ai:8001
```

## قيود/فهارس (اختياري)
```sql
CREATE UNIQUE INDEX IF NOT EXISTS orders_paymentref_unique
ON "Order"(paymentRef) WHERE paymentRef IS NOT NULL;
```

— Created at: 2025-11-08T19:46:25.957140Z
