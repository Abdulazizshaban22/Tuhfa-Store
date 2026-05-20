# TOHFA Fullstack v3.2

### ما الجديد؟
- **EIP‑712** لربط NFC ← NFT مع توقيع من محفظة المستخدم (eth_signTypedData_v4) + **تحقق خادمي** (ethers v6).
- **دمج المحفظة** في Mint Station (vanilla MetaMask؛ Web3Modal/WC يمكن إضافته لاحقًا).
- **مشهد 3D محسن** يحمل glTF (ضع نموذجك في: `apps/web/public/museum/models/vase.glb`) + شريط شراء سريع بالكمية.
- **Web NFC** لقراءة UID وملء الحقل تلقائيًا (إن دعم المتصفح).

## التشغيل السريع
```bash
cp .env.example .env
docker compose up -d db prometheus alertmanager grafana
pnpm -C apps/api i && pnpm -C apps/web i
pnpm -C apps/api prisma:migrate
pnpm -C apps/api dev      # http://localhost:3001
pnpm -C apps/web dev      # http://localhost:3000
```

## مسارات مهمة
- Mint Station: `/admin/web3/mint-station`
- PDPL Requests: `/admin/pdpl/requests`
- Immersive 3D: `/museum/immersive` (ضع glTF في `/public/museum/models/vase.glb`)
- شراء سريع: `POST /api/orders/quick-buy?productId=<id>&qty=<n>`
- مؤشرات Prometheus: `/api/metrics`, بث SSE: `/api/metrics/stream`

— Built at 2025-11-08T20:16:26.055614Z
