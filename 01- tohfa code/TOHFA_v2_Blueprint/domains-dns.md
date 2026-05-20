# Domains & DNS (Production)

Root: tohfa.sa
- www.tohfa.sa → Marketing site
- app.tohfa.sa → Public marketplace
- admin.tohfa.sa → Admin panel
- api.tohfa.sa → Backend API (NestJS)
- iiif.tohfa.sa → IIIF server
- tiles.tohfa.sa → 3D Tiles / scenes
- cdn.tohfa.sa → CDN for media/assets
- sso.tohfa.sa → Auth (optional)
- shop.<handle>.tohfa.sa → Artisan stores (wildcard)
- museum.<partner>.tohfa.sa → Museum galleries (wildcard)

Security:
- WAF in front of app/api
- HSTS (max-age >= 6 months), CSP with nonces/sha256
- Auto SSL renewals
