# TOHFA Unified V∞ — Production Monorepo
Generated: 2025-10-21 08:22

This monorepo contains:
- `apps/api` — NestJS + Prisma (payments, SPL, IIIF, NFT, recommendations)
- `apps/web` — Next.js 15 (market + IIIF viewer + owner widget)
- `apps/ai` — FastAPI (embeddings + cultural insights stubs)
- `apps/worker` — Node (BullMQ) + Kafka events scaffold
- `apps/dao` — Solidity contracts (ERC-721 + royalties) via Hardhat
- `infra/` — Docker Compose (db/pgvector, redis, redpanda, api, ai, web) + monitoring stubs
- `docs/` — PDPL incident log template + runbooks

> Demo mode supported: set `DEMO_MODE=true` in `apps/api` env to bypass live Tap/SPL/Web3 while keeping flows functional.
