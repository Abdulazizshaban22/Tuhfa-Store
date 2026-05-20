
# تحفة v4.8 — Interop + Preservation + Audit (Drop-in Module)

**تاريخ البناء:** 2025-11-09

يشمل:
- IIIF Content Search v2 (`/pages/api/iiif/search.ts`) + IIIF Auth v2 stubs.
- OAI-PMH 2.0 (`/pages/api/oai.ts`) مع `oai_dc` (Dublin Core).
- Preservation: METS/PREMIS + BagIt manifest.
- Telemetry: قوالب OpenTelemetry (Node/Python).
- Nafath SSO: مستند تدفّق تكامل.

## الاستخدام
انسخ مجلد `apps/web` داخل مشروع Next.js لديك (App Router).  
شغّل dev ثم اختبر الروابط الظاهرة في الصفحة الرئيسية `app/page.tsx`.

## ملاحظات
- هذه نقاط خدمة توضيحية (stubs)؛ وصّلها بقاعدة بياناتك ومستودع IIIF/Manifest فعلي.
- أضف سياسات PDPL وNCA CCC قبل الإطلاق الإنتاجي.
