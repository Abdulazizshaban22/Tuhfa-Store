# تحفة — v3.8 (Wallets + Payments + NFC + NFT Amoy)
تجميعة جاهزة للتشغيل تحتوي:
- **Next.js (App)** مع صفحات: `/`, `/checkout`, `/nfc` + REST APIs (`/api/...`).
- **Reown AppKit + Wagmi** لربط المحافظ (WalletConnect) وتشغيل المعاملات.
- **Tap / HyperPay** تكامل دفع (Webhook + نماذج نداء لإنشاء العملية).
- **Web NFC** (Android/Chrome) — كتابة/قراءة NDEF لربط القطعة بـ NFT.
- **NFT Mint** على Polygon Amoy (اختباري) مع عقد ERC-721 (OpenZeppelin) + Hardhat.
- **pgvector** (قابلية تفعيل لاحقًا) لفهرسة الوصف/الصور.
- **AI Caption** (stub) — مسار `/api/caption` يُرجع وصفًا تجريبيًا ويمكن وصله لاحقًا بنموذج فعلي.

> الإصدار: v3.8 — 2025-11-08

---

## 1) التثبيت السريع
```bash
# المتطلبات: Node 20+, pnpm أو npm، Docker (اختياري لقاعدة البيانات)
cd apps/web
pnpm i   # أو: npm i

# انسخ المتغيرات
cp ../../.env.example ../../.env

# شغّل الواجهة (Dev)
pnpm dev   # أو npm run dev
```

## 2) المتغيرات (.env)
انظر الملف `.env.example` واملأ القيم الصحيحة (Tap / HyperPay / AppKit / RPC Amoy).

## 3) الدفع
- **Tap**: إنشاء Charge عبر `/api/payments/tap/create`، واستقبال Webhook في `/api/payments/tap/webhook`.
- **HyperPay**: تهيئة Checkout عبر `/api/payments/hyperpay/create`، واستقبال Webhook في `/api/payments/hyperpay/webhook`.

> ملاحظة: تم تضمين تحقق HMAC لرسائل Webhook (تجريبيًا) — فعّل المفاتيح السرية.

## 4) المحافظ (Reown AppKit + Wagmi)
- واجهة ربط بمحافظ عبر مكوّن `<WalletConnect />` في الشريط العلوي.
- ضبط `NEXT_PUBLIC_WALLETCONNECT_ID` و `NEXT_PUBLIC_APPKIT_PROJECT_ID` في `.env`.

## 5) NFC
- صفحة `/nfc` تحتوي أزرار **Scan** و **Write** (Web NFC). تعمل على **Chrome/Android** عبر HTTPS فقط.

## 6) NFT (Polygon Amoy)
- عقد `Collectible.sol` (ERC721) + سكربت نشر Hardhat.
- مسار `/api/nft/mint` ينفّذ Mint عبر RPC باستخدام مفتاح خاص للاختبار.
- إعداد `CHAIN_RPC_URL` و `CONTRACT_ADDRESS` و `WALLET_PRIVATE_KEY` في `.env`.

## 7) AI Caption + pgvector
- `/api/caption`: يُعيد وصفًا تجريبيًا للملف المرفوع.
- يمكن تشغيل Postgres + pgvector عبر `infra/docker-compose.yml` ثم وصل قاعدة البيانات من واجهة الويب لاحقًا.

---

## الأمان والامتثال
- **PDPL**: وفّر سياسة خصوصية واضحة، وتفعيل لوحة طلبات الحقوق، وربط إشعارات الاختراق (عينة مضافة).
- **Webhooks**: تحقق من التوقيع/HMAC قبل قبول أي تحديث حالة.

---

## أوامر مفيدة
```bash
# نشر العقد على Amoy (اختبار)
cd contracts
pnpm i
pnpm hardhat compile
pnpm hardhat run scripts/deploy.ts --network amoy

# بناء وإنتاج للواجهة
cd ../apps/web
pnpm build && pnpm start
```

> أي توسعة إضافية (3D + XMP، متاجر المتاحف، تقارير الذكاء) أقدر أضيفها في إصدار v3.9.
