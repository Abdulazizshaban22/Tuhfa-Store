
# تحفة v5.0 — Mobile + Realtime Edition

**تاريخ البناء:** 2025-11-09

## ما يحتويه
- تطبيق **Expo (iOS/Android)**: شاشات Home / Product / Checkout / Wallet / ScanNFC / Notifications.
- دمج Push Notifications (Expo → FCM/APNs).
- واجهة NFC أساسية (قراءة/كتابة NDEF).
- محفظات (WalletConnect/Reown) — تهيئة أولية.
- خدمات **Realtime (Fastify+WS)** و **AI (FastAPI)** كبوادئ تشغيل.
- ملف `.env.example` للمفاتيح.

## التشغيل السريع
```bash
cd apps/mobile
npm i
npm run start
# أو:
npm run ios
npm run android
```

### الخدمات
```bash
# في جذر الحزمة
docker compose up --build
# realtime على :7070 (WS على :7071) — AI على :8089
```

## ملاحظات
- فعّل SDKs الدفع (Tap/HyperPay) في v5.1 على شكل جسور Native.
- افتح ملف `.env.example` وانسخ إلى `.env` ثم املأ القيم.
- استخدم EAS Build لرفع TestFlight/Closed Track.
