
# تحفة v4.6 — Sovereign Edition (Governmental) — Build 2025-11-09

هذه الحزمة تقدّم ثلاث قدرات سيادية للمؤسسات والمتاحف الوطنية:

1) **National Heritage Vault (IIIF + Schema.org)**
   - عرض/أرشفة عبر **IIIF Presentation/Image API** (Manifest مثال: `public/iiif/sample-manifest.json`).
   - وسوم **Schema.org** لأنواع: VisualArtwork / 3DModel / Museum (انظر `public/structured_data/`).
   - يمكن التشغيل مع خادم IIIF مثل **Cantaloupe** أو **Loris** (Docker/Standalone).

2) **Institutional Portal**
   - أدوار (RBAC): مدير متحف، قيّم، باحث، مدقّق.
   - تقارير **PDPL** وواجهة توليد تقرير سريع: `/api/sovereign/pdpl/export`.
   - ملاحظات **AES-256 + KMS + IAM Least-Privilege** للتهيئة الإنتاجية.

3) **AI Cultural Forecasting**
   - واجهة `/sovereign/forecast` + API `/api/sovereign/forecast` (انحدار خطّي بسيط كـ fallback).
   - للترقية: Prophet / XGBoost (أضِفها في خدمة ML منفصلة أو داخل نفس API).
   - خريطة تفاعلية **Leaflet** على `/sovereign/map` (يمكن ربط نقاط المتاحف من قاعدة PostGIS).

## تشغيل محلي (مُبسّط)
- انسخ `apps/web` داخل مشروع Next.js لديك أو استعمله كقالب.
- شغّل قاعدة PostgreSQL مع PostGIS ثم طبّق `db/migrations/*`.
- افتح `/sovereign/vault`, `/sovereign/portal`, `/sovereign/map`, `/sovereign/forecast`.

## ربط IIIF فعلياً
- استضف **Cantaloupe** أو **Loris** ووفّر `/iiif/<built-in function id>/info.json` للصور عالية الدقة.
- حدّث `public/iiif/sample-manifest.json` ليشير إلى `service.id` لخادمك.
- لعارضات التكبير استخدم OpenSeadragon أو أي عارض متوافق IIIF.

## PDPL & Security (ملخص تنفيذي)
- اعتمد **التشفير على مستوى التخزين (at-rest)** عبر **KMS** وإسناد المفاتيح إلى أدوار IAM مقيّدة الصلاحية (Least-Privilege).
- افتح قنوات لطلبات أصحاب البيانات (DSR) وسجّل أنشطة المعالجة.
- طابق **ضوابط الأمن السيبراني السحابية (NCA CCC)** عند الاستضافة السحابية.

## PostGIS
- فعّل PostGIS (`000_enable_postgis.sql`) لخزن إحداثيات المتاحف/القطع وعرضها على الخريطة.

> هذه الحزمة هي **قالب جاهز** لتفعيل النسخة السيادية؛ يتطلب ربط مزود الخريطة/الخوادم/المكتبات الإنتاجية تبعًا لسياسة الجهة المستضيفة.
