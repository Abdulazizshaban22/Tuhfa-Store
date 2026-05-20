# Migration Plan (Consolidate & Launch)

1) **Consolidate Codebase**
- Keep `heritage_platform 7` as the canonical source.
- Remove duplicated variants (2..6) after verifying parity.
- Extract shared libs; ensure consistent tsconfig & package versions.

2) **Database**
- Convert Prisma `db push` to proper `migrations`.
- Add seed: craft types, sample artisans, museum exhibits, regions.

3) **Payments**
- Implement Payment Orchestrator with Tap + APS; enable Apple Pay + mada.
- Add provider-agnostic webhook layer.

4) **Address & Shipping**
- Integrate SPL National Address normalization.
- Add carriers (SPL, Aramex) + labels + tracking.

5) **Media & IIIF**
- Stand up IIIF server (e.g., Cantaloupe/Loris) for manifests & deep zoom.
- 360/AR assets served via CDN; consider 3D Tiles for large scenes.

6) **AI Layer**
- Add pgvector to Postgres; implement embeddings & recs v1.
- Launch Auto Tagging, Visual Similarity Search for images.

7) **IoT Layer**
- Generate QR/NFC for Passports; bind to product/exhibit.
- Optional telemetry collectors for workshops.

8) **Security & PDPL**
- Consent ledger; DSR endpoints (export/delete).
- 72h breach workflow and runbooks.

9) **Observability**
- Metrics/logs/traces; uptime checks; error budgets.

10) **Go-Live**
- DNS cutover; WAF + HSTS + CSP; CDN.
- Smoke tests; rollback plan.
