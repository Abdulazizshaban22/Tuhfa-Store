# TOHFA — Bootstrap MVP (تشغيل سريع)

> ضع الملفات التالية بجانب ملف `docker-compose.yml` الأصلي في جذر مشروع: `TOHFA_Vinfinity_Unified/`
> - `docker-compose.override.yml`
> - `.env.api.example` → انسخه إلى `.env.api.local` وعدّل القيم
> - `.env.web.example` → انسخه إلى `.env.web.local` وعدّل القيم

## 1) تشغيل الحاويات (Docker Compose)
```bash
# من مجلد جذر المشروع حيث يوجد docker-compose.yml
docker compose up -d
```
- يفتح المنافذ:
  - Web: http://localhost:3000
  - API: http://localhost:3001
  - AI:  http://localhost:8001
  - DB:  5432 (PostgreSQL)
  - Redis: 6379

> ملاحظة: إذا استخدمت `docker-compose.yml` في مجلد آخر (مثل `infra/`)، انقل هذا الملف معه أو استخدم:
```bash
docker compose -f infra/docker-compose.yml -f docker-compose.override.yml up -d
```

## 2) قاعدة البيانات (Prisma)
من داخل `apps/api/`:
```bash
pnpm install
pnpm prisma:deploy   # أو pnpm prisma:migrate أثناء التطوير
```

## 3) الذكاء (AI)
من داخل `apps/ai/`:
```bash
python -m venv .venv && source .venv/bin/activate  # على Windows: .venv\Scripts\activate
pip install -r ../../TOHFA_bootstrap_MVP_v1/ai_requirements.txt
uvicorn app_sentence:app --host 0.0.0.0 --port 8001
# (أو حدِّث Dockerfile لخدمة ai لتستخدم app_sentence.py)
```

## 4) الويب (Next.js)
من جذر المشروع:
```bash
pnpm dev:web
# ثم افتح http://localhost:3000
```

## 5) التحقق السريع
- API صحّة: http://localhost:3001/health (إن وُجد)
- AI صحّة:  http://localhost:8001/health
- Web: الصفحة الرئيسية تعمل، و`NEXT_PUBLIC_API_BASE` يشير إلى API.

## 6) مفاتيح الدفع (اختياري الآن)
- Tap أو Stripe (وضع الاختبار / Sandbox).
- فعِّل مفاتيح الاختبار في `.env.api.local`.

## 7) تمكين pgvector (اختياري إن لم يكن مفعلًا)
ادخل للحاوية `db` وشغّل:
```bash
docker exec -it <db-container> psql -U postgres -d tohfa -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

> أي أسئلة تشغيلية؟ ارجع للوثائق المشار إليها في ملف العرض.

— فريق تحفة
