# Go-Live Checklist (KSA)

## Legal & Compliance
- PDPL consent + privacy policy links
- Breach playbook (72h SDAIA) + contacts
- Terms of service + returns policy (Arabic-first)

## Payments
- Tap + APS enabled (Apple Pay + mada test cases)
- Webhooks secured & idempotent
- Refund flows

## Address & Shipping
- SPL National Address API keys configured
- Carriers & label printing verified
- Cash on delivery (if enabled) process

## Security
- HSTS, CSP (nonces/sha256), HTTPS-only
- JWT secrets rotated
- Admin RBAC + audit logs

## Observability
- Grafana dashboards; alerts on errors/latency
- SLOs for checkout & payments

## Data & Media
- IIIF server reachable; manifests valid
- CDN headers & caching
- Backups for DB & object storage

## UX
- Arabic RTL + accessibility passes
- Lighthouse performance > 85 on core pages
