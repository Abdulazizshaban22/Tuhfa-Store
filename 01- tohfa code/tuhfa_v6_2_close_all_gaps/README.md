
# تحفة v6.2 — Close All Gaps

تاريخ: 2025-11-09

## المكوّنات الجديدة
- **Reown AppKit** متكاملة (Connect/Sign/Tx) — الويب جاهز لوضع Project ID.
- **Payments**: جسور Tap/HyperPay (Apple Pay/mada) بصيغة استبدال سريعة مع سياسات PDPL/Refund.
- **Web3**: mint/ownerOf (ethers v6) + إعداد الشبكة (Polygon zkEVM).
- **Provenance**: ربط NFC↔NFT، شهادة JSON-LD عامة، عارض 3D + XMP.
- **AI Cultural Core**: pgvector + HNSW + جداول وتدفقات مبدئية.
- **PDPL**: سجّل موافقات، DSR (طلبات الحقوق)، نقاط تصدير لاحقًا.
- **Dashboard + Cultural Map**: لوحات زمنية وخرائط طلب جاهزة للتوصيل.
- **Infra**: Docker Compose + مخطط Terraform (يوضع لاحقًا) للنشر على AWS.

## التشغيل
```bash
docker compose up -d
cd apps/web && cp .env.example .env && npm i && npm run dev
```

## الضبط
- المحافظ: `WALLETCONNECT_PROJECT_ID`, `CHAIN_RPC_URL`, `NEXT_PUBLIC_CONTRACT`, `CONTRACT_PRIVATE_KEY`.
- المدفوعات: `TAP_SECRET`, `HYPERPAY_*`, وملف **Apple Pay domain association** في `public/.well-known/`.
- قاعدة البيانات: `DATABASE_URL` (افتراضيًا Postgres محلي).

## ملاحظات
- استبدل استدعاءات Tap/HyperPay بالمسارات الفعلية وفق الوثائق الرسمية.
- لتضمين XMP في GLB استخدم glTF-Transform CLI (دليل ضمن `scripts/xmp_embed.README.md`).

