
# تحفة v4.6.1 — Sovereign Ops

> **يشمل**: خادم IIIF فعلي عبر Docker (Cantaloupe)، عارض OpenSeadragon، خدمة ML للتنبؤ (Prophet/XGB مع fallback)، وجسر KMS للتشفير.

## 1) IIIF — Cantaloupe
- صورة Docker: `uclalibrary/cantaloupe:5.0.7-0` (تشغيل على `:8182`).  
- الضبط في: `infra/cantaloupe/cantaloupe.properties` (FilesystemResolver → `/var/cantaloupe/images`).  
- ضع صور TIFF/JPEG في `data/images/` ثم جرّب:  
  - `http://localhost:8182/iiif/2/test.tif/info.json`  
> مواصفات IIIF Image/Presentation v3 موثقة لدى IIIF. استخدم OpenSeadragon أو Mirador للعرض.  

## 2) Viewer — OpenSeadragon
- صفحة: `apps/web/app/sovereign/viewer/page.tsx`  
- أدخل رابط `info.json` لخادم IIIF وسيظهر التكبير العميق.

## 3) Forecasting ML
- خدمة FastAPI في `services/forecasting`:
  - `/forecast` يدعم `model=prophet|xgb|auto`، ويسقط إلى انحدار خطّي إن تعذّر.  
  - `Dockerfile` يُنصّب المتطلبات (قد يتخطّى Prophet في بيئات بلا إنترنت).  
  - اربطها مع واجهة `/sovereign/forecast` لديك.

## 4) KMS Bridge
- خدمة Node (AWS SDK v3) مع مسارات `/encrypt` و`/decrypt` وتحتاج `KMS_KEY_ID` و`KMS_REGION`.  
- الهدف: تشفير بيانات حساسة (DSR/تقارير) وفق سياسات السيادة.

## 5) تشغيل سريع
```bash
# IIIF + PostGIS
docker compose -f infra/docker-compose.yml up -d

# Forecasting
docker build -t tuhfa-forecast services/forecasting
docker run -p 8088:8088 tuhfa-forecast

# KMS
docker build -t tuhfa-kms services/kms_bridge
docker run -e KMS_KEY_ID=... -e KMS_REGION=me-central-1 -p 8090:8090 tuhfa-kms
```

## 6) تكامل الواجهة
- اربط `/sovereign/viewer` مع Manifest/Info.json من Cantaloupe.  
- استدعِ `/forecast` من واجهة `/sovereign/forecast`.  
- استخدم جسر KMS لتشفير سجلات PDPL قبل التخزين.

## ملاحظات
- Prophet/XGBoost يحتاجان إنترنت أثناء البناء أو مرآة داخلية.  
- يمكن استبدال Cantaloupe بـ Loris عبر الخدمة المعلّقة في compose.

تاريخ البناء: 2025-11-09
