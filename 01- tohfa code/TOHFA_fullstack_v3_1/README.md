# TOHFA Fullstack v3.1

إضافة 3 وحدات رئيسية:
1) **Mint Station** (سكّ ERC-721 وربط NFC→NFT).
2) **لوحة PDPL Requests** (طلبات أصحاب البيانات: الوصول/التصحيح/المحو/التقييد/سحب الموافقة/قابلية النقل).
3) **معرض ثلاثي الأبعاد** قابل للنقر مع شراء سريع داخل المشهد (A-Frame).

## التشغيل السريع
```bash
cp .env.example .env
docker compose up -d db prometheus alertmanager grafana
# تثبيت التبعيات والتشغيل محليًا:
pnpm -C apps/api i && pnpm -C apps/web i
pnpm -C apps/api prisma:migrate
pnpm -C apps/api dev      # http://localhost:3001
pnpm -C apps/web dev      # http://localhost:3000
```

## مسارات مهمة
- Mint Station: `/admin/web3/mint-station`
- PDPL Requests: `/admin/pdpl/requests`
- Immersive 3D: `/museum/immersive` (مشهد A-Frame في `/public/museum/immersive/aframe.html`)
- شراء سريع من 3D: POST `/api/orders/quick-buy?productId=<id>`
- مؤشرات Prometheus: `/api/metrics`, بث حي SSE: `/api/metrics/stream`

— Built at 2025-11-08T20:13:14.808934Z
