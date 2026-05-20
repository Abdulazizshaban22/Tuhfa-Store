# TOHFA Fullstack v3.3

### ما الجديد؟
- **PurchaseIntent (EIP‑712)**: توقيع شراء داخل مشهد 3D بمحفظتك، مع تحقق خادمي وإنشاء Order بحالة `signed`.
- **Slack Notifier**: تنبيهات فورية عند إنشاء الطلبات واستلام Webhooks.
- **Unified Webhook**: نقطة `/api/webhooks/unified` لأي مزود (Stripe/Tap/غيرهما) مع رؤوس `x-provider`, `x-event-type`.
- **حزمة أصول**: manifest + ترخيص لملفات GLB/GLTF.

## التشغيل السريع
```bash
cp .env.example .env
docker compose up -d db
pnpm -C apps/api i && pnpm -C apps/web i
pnpm -C apps/api prisma:migrate
pnpm -C apps/api dev      # http://localhost:3001
pnpm -C apps/web dev      # http://localhost:3000
```

## المسارات
- **مشهد 3D**: `/museum/immersive` — أزرار: شراء سريع، توقيع شراء (EIP‑712).
- **Webhook موحَّد**: `POST /api/webhooks/unified` + رؤوس `x-provider`,`x-event-type`.
- **Slack**: فعّل `SLACK_WEBHOOK_URL` في `.env`.

— Built at 2025-11-08T20:21:10.293511Z
