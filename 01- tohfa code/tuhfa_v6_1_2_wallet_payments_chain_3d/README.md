
# تحفة v6.1.2 — Wallet + Payments + Chain + 3D (Deliverable)

تاريخ البناء: 2025-11-09

## المحتويات
- **Services**: DB(pgvector) + Realtime + AI + Metrics
- **Web (Next.js)**: Wallet page, Checkout (Tap/HyperPay stubs), 3D gallery (model-viewer), XMP inspect API, Web3 mint/ownerOf/config, NFC link, Provenance cert (QR/JSON-LD)
- **Mobile (Expo)**: Wallet placeholder + NFC + Checkout demo

## التشغيل
```bash
docker compose up --build
# DB:5432  | Realtime:7070/WS:7071  | AI:8089  | Metrics:7080
```

### الويب (تشغيل مستقل)
```bash
cd apps/web
cp .env.example .env   # املأ المفاتيح
npm i
npm run dev
```
افتح: `/wallet`, `/checkout`, `/gallery/3d`, `/admin/dashboard`, `/provenance/cert?id=TUHFA-0001`.

### الموبايل
```bash
cd apps/mobile
npm i
npm run ios   # أو: npm run android
```
فعّل `WALLETCONNECT_PROJECT_ID` و SDKs Tap/HyperPay أصلية في الإصدار التالي.

## ملاحظات
- لسكّ NFT حقيقي: ضع `CHAIN_RPC_URL` + `CONTRACT_PRIVATE_KEY` + `NEXT_PUBLIC_CONTRACT` ثم استخدم `/api/web3/mint`.
- لفحص XMP داخل GLB: استخدم `/api/xmp/inspect?url=<GLB>` وستظهر بيانات `KHR_xmp_json_ld` إن وجدت.
- لتمكين Apple Pay/mada: اربط مفاتيح Tap أو HyperPay داخل صفحات `/api/payments/*` وطبّق متطلبات المزود.
