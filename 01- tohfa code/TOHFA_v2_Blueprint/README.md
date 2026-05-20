# TOHFA v2 — Cultural Marketplace (KSA) — Blueprint
Date: 2025-10-20

## Vision
TOHFA becomes Saudi Arabia’s cultural marketplace that bridges **museums** and **crafts**:
- Marketplace for artisans (Etsy-style, but culture-first).
- Digital Museum Mode (IIIF + 360°/AR) with purchasable craft spin-offs.
- Identity & provenance: **Tohfa Passport** (QR/NFC + C2PA provenance + GI-style tagging).
- AI + IoT layers: recommendations, authenticity hints, telemetry in workshops/museums.

## KSA Priorities
- Local payments (mada, Apple Pay) via Tap / APS.
- National Address (SPL) for shipping & validation.
- PDPL compliance (consent logs, 72h breach reporting workflow).
- Arabic-first UX (RTL), bilingual content.
- Partnerships with museums & heritage bodies.

## Deliverables in this bundle
- 50-innovative-tools.csv — feature backlog with categories & quick specs
- erd.md — data model (high-level) linking Crafts ↔ Artisans ↔ Museums ↔ Products ↔ Orders ↔ Workshops
- api-spec.md — REST-ish endpoints (first-pass)
- migration-plan.md — consolidate v7, seed/migrations, payments & address, IIIF/3D Tiles
- go-live-checklist.md — security, PDPL, payments, DNS/CDN, observability
- domains-dns.md — subdomain plan for KSA production + HSTS/CSP/WAF
- ai-iot-plan.md — embeddings/recs/authenticity + QR/NFC + on-site telemetry
- seeding.md — initial seed strategy for artisans, crafts, museum exhibits
