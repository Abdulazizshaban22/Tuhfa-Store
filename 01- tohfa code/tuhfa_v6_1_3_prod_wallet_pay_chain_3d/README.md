
# تحفة v6.1.3 — إنتاج المحافظ والدفع والسلسلة + XMP

تاريخ البناء: 2025-11-09

## الجديد
- صفحات **سياسات PDPL/Refund** ضمن الواجهة.
- ملف **Apple Pay domain association** (placeholder) في `public/.well-known/`.
- **Tap/HyperPay** جسور خادمية (placeholders) مع حقول ومتحولات بيئة واضحة.
- **Web3 mint/ownerOf** عبر `ethers` مع إعدادات شبكة Polygon zkEVM.
- **NFC↔NFT** تخزين فعلي في Postgres عبر `/api/nfc/link`.
- عارض **3D** مع لوحة XMP.

## التشغيل السريع
```bash
docker compose up -d
cd apps/web && cp .env.example .env && npm i && npm run dev
```
> تأكد من تعيين: `WALLETCONNECT_PROJECT_ID`, `CHAIN_RPC_URL`, `NEXT_PUBLIC_CONTRACT`, ومفاتيح الدفع.

## ملاحظات
- ضع ملف Apple Pay الحقيقي داخل: `apps/web/public/.well-known/apple-developer-merchantid-domain-association`.
- فعّل Apple Pay/mada من مزوّدك (Tap/HyperPay) ثم اختبر `/checkout`.
- اسكب XMP داخل GLB باستخدام امتداد `KHR_xmp_json_ld` لعرض معلومات الأصالة.
