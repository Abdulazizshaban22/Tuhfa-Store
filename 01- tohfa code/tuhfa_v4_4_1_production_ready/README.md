
# Tuhfa v4.4.1 — Production-Ready (Build 2025-11-09)

يشمل:
- **Checkout Apple Pay/mada** (Tap/HyperPay) — مسارات API جاهزة للوَصل الفعلي.
- **3D Museum Store** — عارض GLB بالإمكانات الأساسية (Three.js + GLTFLoader).
- **AI Captioning** — خدمة FastAPI، قابلة للترقية إلى BLIP-2/CLIP.
- **pgvector + HNSW** — مخطط قاعدة بيانات جاهز للفهرسة الشبيهة.
- **Apple Pay Domain Verification** — ملف placeholder للنشر.
- **Docker Compose** — web + ai + db.

## التشغيل المحلي
```bash
docker compose up -d
# web: http://localhost:3000
# ai : http://localhost:8000/health
# db : postgres://tuhfa:tuhfa@localhost:5432/tuhfa
```
ضع نموذج ثلاثي الأبعاد في `apps/web/public/models/sample.glb` ثم افتح `/museum/demo`.

## وصل الدفع (مختصر)
- **Apple Pay Verification**: ارفع ملف Apple إلى `/.well-known/apple-developer-merchantid-domain-association` ثم تحقّق عبر Apple Developer.
- **Tap**: فعّل Apple Pay/mada من لوحة Tap، ثم نفّذ طلب إنشاء Session/Charge داخل `/pages/api/payments/tap/session.ts`.
- **HyperPay**: أنشئ `checkoutId` وأكمل التدفق داخل `/pages/api/payments/hyperpay/session.ts`.

## الذكاء الصوري
بدّل خدمة caption المؤقتة بنموذج BLIP-2/CLIP، وخزن المتجهات في pgvector، وفعل فهرس HNSW لبحث سريع.
