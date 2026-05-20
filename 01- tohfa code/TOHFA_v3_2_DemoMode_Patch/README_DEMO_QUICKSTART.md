# TOHFA — Demo Mode Quickstart
Generated: 2025-10-21 08:05

## 1) تشغيل بدون مفاتيح
- أضف في بيئة الـAPI:
```
DEMO_MODE=true
```
- يشغّل:
  - مدفوعات وهمية مع رابط تحويل Sandbox
  - تحقق SPL صوري
  - NFT شهادات محلية (بدون بلوكتشين)

## 2) أوامر
```bash
cd infra
docker compose -f docker-compose.prod.yml up --build
pnpm --filter api prisma:migrate
pnpm --filter api seed
```

## 3) ترقية لاحقًا إلى الإنتاج
- أزل `DEMO_MODE` وأضف:
  - TAP_SECRET_KEY, TAP_MERCHANT_ID
  - SPL_API_KEY
  - WEB3_PRIVATE_KEY, POLYGON_RPC_URL, CHAIN_ID, NFT_CONTRACT_ADDRESS
