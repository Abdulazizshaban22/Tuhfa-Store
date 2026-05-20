# تحفة — v3.7 (Payments + Seller Dashboard + Image AI + Provenance)

## كيف أشغّل؟
```bash
docker compose up -d  # قاعدة البيانات + Redis
# في نافذة أخرى:
cd apps/api && cp .env.example .env && npm i && npx prisma generate && npx prisma migrate dev --name init && npm run dev
# في نافذة ثالثة:
cd scripts && npm i && npm run seed
# في نافذة رابعة:
cd apps/web && echo "NEXT_PUBLIC_API_BASE=http://localhost:3001" > .env.local && npm i && npm run dev
```

## المدفوعات (Tap/HyperPay)
- اختر المزوّد عبر `PAYMENTS_PROVIDER=tap | hyperpay`.
- نقطة الإنشاء: `POST /api/payments/create` ترجع جلسة المزوّد + سجل في جدول `Payment`.
- **Apple Pay/Mada** عبر Tap (تفعيل Apple Pay من جانب Tap أولاً).

## لوحة البائع/المتحف
صفحة `/seller` لإدارة العناصر (نموذج أولي). الجداول: `Offer`, `Coupon`, `Bundle` (+ `BundleItem`).

## الفهرسة الصورية (BLIP + CLIP)
خدمة AI على `:8079`:
- `/caption` تولّد وصفًا لصورة (BLIP).
- `/clip-filter` تعطي مؤشّر ملاءمة ثقافية (مبدئي).

## السلسلة/Provenance
- سكّ ERC-721 عبر `/api/web3/mint` (يتطلّب عقدًا منشورًا وبيئة Polygon).
- اربط بطاقة NFC عبر `/api/web3/nfc/hash` + جدول `NfcLink`.

> **مهم:** النماذج الثقيلة (BLIP/CLIP) تُحمّل من Hugging Face — يلزم اتصال أولي أو كاش سابق.