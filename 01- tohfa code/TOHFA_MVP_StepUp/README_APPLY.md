# TOHFA — MVP Step-Up Patch (Filters + Storefront + Checkout + SPL + pgvector)
Generated: 2025-10-21T00:20:48.607287

## Apply
- Copy **backend/src/modules/** files into your API project.
- Add `PaymentsModule` import to your AppModule if not present.
- Copy **backend/prisma/migrations/add_pgvector.sql** and follow **backend/prisma/EMBEDDINGS.md**.
- Copy **frontend/app/** pages into your Next.js app.

## Env
```
PAYMENTS_PROVIDER=tap   # or aps
SPL_API_KEY=your_spl_key
SPL_BASE=https://api.address.gov.sa
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

## Example
- `/products?craft=SADU&q=سجادة&region=ASR&patterns=هندسية&materials=صوف,وبر`
- `/artisan/<store_handle>`
- `/checkout`
