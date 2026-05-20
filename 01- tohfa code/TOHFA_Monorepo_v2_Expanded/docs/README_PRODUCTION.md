# TOHFA — Production Monorepo v2 (Turborepo)
Generated: 2025-10-21 07:34

## Run (Docker Compose)
```bash
cd infra
docker compose -f docker-compose.prod.yml up --build
# web: http://localhost:3000 | api: http://localhost:4000 | ai: http://localhost:8001
```

## Auth (NextAuth v5 + Prisma Adapter)
- Config at `apps/web/auth.ts` & `auth.config.ts` (v5 style, database sessions).
- Add DB tables via Prisma schema in `apps/api/prisma/schema.prisma` (User/Account/Session/VerificationToken).
- References: Auth.js v5 migration & adapters (see main README).

## Payments
- Tap service implements `POST /charges` with `src_sa.mada` / `src_apple_pay` / `src_all` (hosted) and idempotent key.
- For APS fallback, replace placeholder with real calls from APS docs.
- Redirect URL returned as `transactionUrl` for hosted/redirect flow.

## SPL
- `POST /spl/validate` -> reads `SPL_API_KEY` and calls `{base}/v3/address/validate` placeholder (adjust path per SPL docs).

## AI & pgvector
- `Product.embedding` vector(384) + HNSW index (cosine).
- `apps/ai` FastAPI `/embed` returns dummy 384-dim vectors — swap with MiniLM/CLIP later.
- `PUT /products/:externalId/embedding` writes vectors via raw SQL.

## CI/CD
- `.github/workflows/ecr-build-push.yml` pushes API/WEB/AI images to ECR with OIDC.
- Vercel recommended for `apps/web` with Remote Cache; ECS/Fargate for API/AI.

## Notes
- Fill `.env.example` per app, then copy to `.env` with real secrets.
- For Apple Pay domain verification & mada enablement, follow provider steps.
