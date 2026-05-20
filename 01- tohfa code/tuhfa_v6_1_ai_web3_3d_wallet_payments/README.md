
# تحفة v6.1 — AI + Web3 + 3D + Wallet + Payments

تاريخ البناء: 2025-11-09

## المحتويات
- DB (Postgres/pgvector) + seed
- Services: realtime (7070/7071 WS), ai (8089), metrics (7080)
- Web (Next.js) — معرض 3D، شهادة Provenance، صفحات API لـ web3/payments/NFC، Dashboard حيّ
- Mobile (Expo) — Reown AppKit init + NFC + Checkout demo

## التشغيل
```bash
docker compose up --build
# DB:5432, Realtime:7070/7071, AI:8089, Metrics:7080
```

### الويب
انسخ مجلد apps/web إلى مشروع Next.js وشغّل dev.
- /gallery/3d — عارض ثلاثي (placeholder)
- /provenance/cert?id=TUHFA-0001 — شهادة JSON-LD مع SHA-256
- /checkout/demo — نموذج دفع تجريبي
- /admin/dashboard — يسحب من Metrics API

### الموبايل
```
cd apps/mobile
npm i
npm run ios  # أو android
```
- فعّل Reown AppKit بـ WALLETCONNECT_PROJECT_ID
- اربط Tap/HyperPay كـ Native Modules لاحقًا

## بيئة
انقل .env.example لكل من الويب والموبايل إلى .env وأكمل القيم.
