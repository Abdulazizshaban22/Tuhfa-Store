# TOHFA Fullstack v3.0

منظومة إنتاجية جاهزة: **API (NestJS) + Web (Next.js) + Mobile (Expo) + Observability (Prometheus/Grafana/Alertmanager)**.

## المتطلبات
- Node.js 18+
- Docker + Docker Compose
- pnpm أو npm

## التشغيل السريع
```bash
cp .env.example .env
docker compose up -d db prometheus alertmanager grafana
# تثبيت تبعيات الويب والـAPI (خارج الحاويات للتطوير المحلي)
pnpm -C apps/api i && pnpm -C apps/web i
pnpm -C apps/api prisma:migrate
pnpm -C apps/api dev   # http://localhost:3001/api/metrics
pnpm -C apps/web dev   # http://localhost:3000
```

## مراجع تشغيل
- مؤشرات Prometheus عبر `/api/metrics`
- بث حي SSE: `/api/metrics/stream` وواجهة `/admin/live`
- تقارير PDF: `/api/admin/reports/sales.pdf`
- الأعلام: `/api/admin/flags`

— Built at 2025-11-08T20:09:19.794948Z
