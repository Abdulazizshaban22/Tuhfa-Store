# TOHFA — v3 Pro (Meta & Authenticity)
Generated: 2025-10-21 07:50

## What’s new
- C2PA signing pipeline (`tools/c2pa-sign`).
- IIIF Manifest generator (`/iiif/manifest/product/:externalId`) + web viewer `/iiif/demo`.
- GS1 Digital Link resolver (`/dl/:gtin`) + seed GTIN mapping.
- AR Quick Look hooks (USDZ) + `<model-viewer>` glTF in product page.
- Recommendations endpoint `/products/:externalId/recommendations` (pgvector HNSW).
- B2B portal scaffold `/b2b`.
- NFT certificate scaffolding `/web3/nft/:externalId/prepare` (Polygon).
- PDPL incident log endpoints `/pdpl/incidents`.
- SPL verify address `/spl/validate` wired to `api.address.gov.sa`.

## Run locally
```bash
cd infra && docker compose -f docker-compose.prod.yml up --build
# web http://localhost:3000 | api http://localhost:4000
pnpm --filter api prisma:migrate && pnpm --filter api seed
```

## References (Standards & Docs)
- C2PA JS SDK & repo
- IIIF Presentation API v3
- GS1 Digital Link & Sunrise 2027
- Apple AR Quick Look (USDZ) & <model-viewer>
- Tap charges (Apple Pay + mada) & APS
- pgvector + HNSW
- NextAuth v5 Prisma Adapter
- SPL National Address API
