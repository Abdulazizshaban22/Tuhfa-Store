# TOHFA_dev_pack_v2_1 — Webhooks (Stripe/Tap) + Similar Products (pgvector)

## ماذا أضفنا؟
1) **ويب هوكس الدفع:**
   - `apps/api/src/webhooks/stripe.controller.ts`
     - يستقبل أحداث Stripe مثل `checkout.session.completed` ويُحدّث الطلب إلى `paid`.
     - يتطلب **التحقق من التوقيع** عبر ترويسة `Stripe-Signature` + `STRIPE_WEBHOOK_SECRET`.
   - `apps/api/src/webhooks/tap.controller.ts`
     - يستقبل إشعارات Tap (بما فيها STC Pay) ويُحدّث الطلب إلى `paid` عند نجاح العملية.
     - يُوصى بالتحقق من ترويسة التوقيع الخاصة بـ Tap في الإنتاج.

2) **منتجات مشابهة + توليد تمثيل (Embedding):**
   - `apps/api/src/products/products.service.ts` + `similar.controller.ts`
   - Endpoint: `GET /products/:id/embed` → يُنشئ/يُحدّث embedding للقطعة.
   - Endpoint: `GET /products/:id/similar?limit=10` → يرجع قائمة أقرب القطع حسب **cosine** باستخدام pgvector.

3) **فهرس pgvector:**
   - `apps/api/prisma/migration_pgvector_index.sql` → فهرس HNSW مع `vector_cosine_ops`.

---

## التوصيلات المطلوبة

### 1) تفعيل raw body لStripe (NestJS)
Stripe يفرض الوصول إلى **نص الطلب الخام** للتحقق من التوقيع.
أضف في bootstrap (main.ts) قبل `app.listen`:

```ts
import * as bodyParser from 'body-parser';
app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json()); // لبقية المسارات
```

> إن استخدمت Fastify، استخدم fastify-raw-body أو ما يكافئه.

### 2) استيراد الوحدات في AppModule
أضف الكنترولرز والمزوّدات الجديدة:
```ts
import { StripeWebhookController } from './webhooks/stripe.controller';
import { TapWebhookController } from './webhooks/tap.controller';
import { ProductsService } from './products/products.service';
import { ProductsSimilarController } from './products/similar.controller';
import { AiService } from './ai/ai.service';

@Module({
  controllers: [StripeWebhookController, TapWebhookController, ProductsSimilarController, /* ...existing */],
  providers: [ProductsService, AiService, /* ...existing */],
})
export class AppModule {}
```

### 3) البيئة
- Stripe:
  - `STRIPE_SECRET_KEY=sk_test_...`
  - `STRIPE_WEBHOOK_SECRET=whsec_...`
- Tap:
  - `TAP_SECRET_KEY=sk_test_...`
  - `TAP_MERCHANT_ID=...`
- AI:
  - `AI_BASE=http://ai:8001`

### 4) ترحيل الفهارس
نفّذ:
```bash
psql $DATABASE_URL -f apps/api/prisma/migration_pgvector_index.sql
```

### 5) توليد Embeddings أولية
بعد تشغيل خدمة AI والـAPI:
- لمنتج معيّن: `GET /products/:id/embed`
- أو سكربت جماعي بسيط يمر على كل المنتجات ويستدعي `/embed`.

### 6) STC Pay عبر Tap
لاستخدام STC Pay:
- عند إنشاء Charge حدّد `source.id = "src_sa.stcpay"` وأرفِق الهاتف.
- في وضع الـRedirect استخدم `transaction.url` لإعادة توجيه العميل.

---

## مراجع تقنية مختصرة
- Stripe Webhooks و`Stripe-Signature` للتحقق من المصدر.
- ضرورة **raw body** في NestJS لتوقيع Stripe.
- Tap Webhooks تتضمّن ترويسة توقيع يجب التحقق منها.
- Tap STC Pay: `source.id = src_sa.stcpay` + رقم هاتف.
- pgvector HNSW + `vector_cosine_ops` للفهرسة والتشابه.
- Prisma `$queryRaw` و`$executeRaw` لاستعلامات SQL الخام.

— فريق تحفة
