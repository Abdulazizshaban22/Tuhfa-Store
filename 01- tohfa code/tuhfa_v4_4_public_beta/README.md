
# Tuhfa v4.4 — Public Beta (Build 2025-11-09)

يشمل هذا الإصدار:
- **Checkout Apple Pay/mada** (Tap/HyperPay) — مسارات جاهزة للوصل.
- **3D Museum Store** — عارض GLTF/GLB (ثلاثي الأبعاد) + شراء داخل المشهد.
- **AI Captioning** — خدمة FastAPI + Batch Indexer (بديل مؤقت لـ CLIP/BLIP2).
- **Cultural Analytics** — واجهة أولية + API.
- **PDPL Legal** — صفحات خصوصية/شروط/استرجاع.
- **Docker Compose** — web + ai + postgres(pgvector).

## التشغيل السريع
```bash
docker compose up -d
# web: http://localhost:3000
# ai : http://localhost:8000/health
# db : postgres://tuhfa:tuhfa@localhost:5432/tuhfa
```

## الدمج الفعلي
- **Apple Pay Domain Verification**: ارفع ملف Apple إلى المسار `/.well-known/apple-developer-merchantid-domain-association` على الدومين ثم تحقّق من لوحة Apple Developer.
- **Tap / HyperPay SDKs**: استبدل مسارات API الوهمية بنداءات المزود (create charge/checkoutId)، واملأ `.env` بالقيم الحقيقية.
- **Three.js**: أضف GLTFLoader على صفحة المتحف، وحمّل ملف `/public/models/sample.glb` واضبط زر الشراء للنداء على `/checkout`.
- **AI**: استبدل خدمة caption المؤقتة بنموذج CLIP/BLIP2، وتخزين المتجهات في pgvector + HNSW.
