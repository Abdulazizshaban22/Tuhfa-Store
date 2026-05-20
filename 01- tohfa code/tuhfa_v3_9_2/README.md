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



# تحفة — v3.9 (Wallets + Payments + NFC + NFT + 3D XMP + Vector Search)
**جديد v3.9 (2025-11-08)**
- **3D XMP**: سكربت Node/TS لإدراج {"KHR_xmp_json_ld"} داخل ملفات glTF/GLB لإسناد الأصالة (provenance).
- **فهرسة صور فعلية + pgvector/HNSW**: مخططات قاعدة بيانات + سكربتات فهرسة + مسار /api/search/similar.
- **صفحة منتج** مع زر **Scan-to-Own**: شراء + سكّ NFT + ربط NFC (تدفق متكامل).



# تحفة — v3.9.1 (AI Caption+CLIP + ApplePay UI + Certificate)
**جديد v3.9.1 — 2025-11-08**
- **خدمة AI (FastAPI)**: BLIP للتعليق على الصور + CLIP لتوليد متجهات موحّدة (512) للصورة/النص.
- **pgvector (512-d)**: مخطط محدّث + واجهات `/api/search/similar` و سكربت فهرسة.
- **شهادة الملكية**: صفحة `/certificate/[tokenId]` تُظهر المالك الحالي + `tokenURI` وتقرأ XMP من GLB عبر `/api/xmp/extract`.
- **Checkout محسّن**: زر Apple Pay/Mada مصقول وتمرير `method` إلى Tap (`src_apple_pay` عند اللزوم).
- **لوحة Analytics (تجريبية)**: جدول أحداث + صفحة `/dashboard` تعرض عدد المشتريات/السك/المسح (NFC).


# تحفة — v3.9.2 (Apple Pay Production + QR Certificate + Auto Indexer + 3D Shop)
**جديد v3.9.2 — 2025-11-08**
- **Apple Pay (Tap) Production**: ملف domain association (placeholder) تحت `apps/web/public/.well-known/` + صفحات **Terms / Refund / Privacy (PDPL)**.
- **On-chain Certificate (QR)**: صفحة `/certificate/[tokenId]/qr` + **/api/certificate/proof** تُنشئ JSON-LD فيه توقيت ISO و بصمة **SHA-256** للـtokenURI/الأصل.
- **Indexer تلقائي**: سكربت `scripts/watch-indexer.ts` يفهرس المنتجات الجديدة (CLIP 512d) بشكل دوري.
- **Museum Viewer**: صفحة `/museum/[slug]` (Three.js GLTFLoader) مع زر **Buy Now** داخل المشهد.
