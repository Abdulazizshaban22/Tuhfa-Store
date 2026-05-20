
# تحفة v6.0 — Deluxe Sovereign Edition

**تاريخ البناء:** 2025-11-09

## المكوّنات
- **Web (Next.js)**: معرض 3D + لوحة قيادة + API (OAI/METS/PREMIS/Provenance).
- **Services**: Realtime (Fastify+WS) + AI (FastAPI) + قاعدة بيانات PostgreSQL/pgvector.
- **Mobile (Expo)**: تحديث لشاشات v5 + تمهيد AR.

## تشغيل
```bash
# خدمات الخلفية
docker compose up --build

# الويب — ضعه داخل مشروع Next.js (App Router) أو انسخه إلى مشروعك
# الموبايل — apps/mobile (Expo): npm i && npm run ios/android
```

## الخطوات التالية (مقترحة)
- ربط three.js أو model-viewer لملفات GLB مع XMP (KHR_xmp_json_ld).
- تمكين Reown AppKit بالمفاتيح الحقيقية، وربط Tap/HyperPay (Apple Pay/mada).
- توصيل cert QR بقراءة المالك من العقد على الشبكة.
- ضخّ Telemetry (OTLP) ومراقبة (Grafana/Tempo/Loki).
