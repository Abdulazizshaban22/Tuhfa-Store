# TOHFA_dev_pack_v2_2 — Tap HMAC + Similar UI + Bulk Embeddings + Cron

## ما الجديد؟
1) **تحقق توقيع Tap (HMAC-SHA256):**
   - `apps/api/src/webhooks/tap.verify.ts`
   - `apps/api/src/webhooks/tap.secure.controller.ts`
   - متغيّرات البيئة: `TAP_WEBHOOK_SECRET`, `TAP_SIGNATURE_HEADER` (افتراضي: `tap-signature`).
   - يحتاج **raw body** لهذا المسار أيضًا لتجنّب كسر التوقيع.
   - ملاحظة: توثيق Tap يذكر وجود **signature header** ويجب التحقق منه قبل المعالجة؛ اسم الرأس وخوارزمية التوقيع قد تختلف حسب التهيئة في لوحة Tap — اجعلها مطابقة لإعداد حسابك.

2) **واجهة “قطع مشابهة” (Next.js):**
   - `apps/web/app/components/SimilarGrid.tsx`
   - تعديل `product/[id]/page.tsx` لإظهار شبكة مشابهة مع نسبة التشابه.

3) **سكربت تضمين جماعي (Embeddings):**
   - `apps/api/src/scripts/embed-all.ts` — يمر على كل المنتجات، يستدعي خدمة AI، ويعمل Upsert في جدول `ProductEmbedding_real`.

4) **كرون اختياري لتحديث التمثيلات:**
   - `apps/api/src/jobs/embedding.cron.ts` — كل 6 ساعات (يتطلب `@nestjs/schedule`).

---

## التوصيل السريع

### 1) Nest bootstrap (raw body)
أضِف في `main.ts`:
```ts
import * as bodyParser from 'body-parser';
app.use('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }));
app.use('/webhooks/tap-secure', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());
```

### 2) AppModule
```ts
import { TapWebhookSecureController } from './webhooks/tap.secure.controller';
import { ProductsSimilarController } from './products/similar.controller';
import { ProductsService } from './products/products.service';
import { AiService } from './ai/ai.service';
// Optional Cron
import { ScheduleModule } from '@nestjs/schedule';
import { EmbeddingCronJob } from './jobs/embedding.cron';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TapWebhookSecureController, ProductsSimilarController],
  providers: [ProductsService, AiService, EmbeddingCronJob],
})
export class AppModule {}
```

### 3) البيئة
```
AI_BASE=http://ai:8001
TAP_WEBHOOK_SECRET=your_tap_hmac_secret
TAP_SIGNATURE_HEADER=tap-signature
```

### 4) السكربت الجماعي
```
pnpm ts-node apps/api/src/scripts/embed-all.ts
```

### 5) الواجهة
- لا تنسَ بناء الويب بعد تحديث الملفات.
- تأكد أن `NEXT_PUBLIC_API_BASE` صحيح.

— فريق تحفة
