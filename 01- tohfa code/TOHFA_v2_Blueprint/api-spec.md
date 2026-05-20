# API Spec (Outline)

## Auth & Users
- POST /auth/register (artisan|visitor|museum)
- POST /auth/login
- GET /users/me

## Artisans & Stores
- GET /artisans/:id
- PATCH /artisans/:id
- POST /artisans/:id/storefront/theme

## Products
- GET /products?craftType=&region=&q=
- POST /products
- GET /products/:id
- POST /products/:id/passport/stamp (QR/NFC/C2PA)

## Custom Orders
- POST /custom-orders
- POST /custom-orders/:id/quote
- POST /custom-orders/:id/milestones/:m/start

## Exhibits & IIIF
- POST /iiif/manifests
- GET /exhibits/:id
- POST /exhibits/:id/playlist

## Workshops
- GET /workshops?region=&craftType=
- POST /workshops
- POST /workshops/:id/tickets

## Payments (Tap/APS)
- POST /payments/checkout (provider=tap|aps, method=applepay|mada|card|wallet)
- POST /payments/webhook/:provider

## Address & Shipping
- GET /address/normalize (via SPL)
- POST /shipping/label (carrier=spl|aramex)

## Analytics & Admin
- GET /analytics/sales
- GET /analytics/visitors
- POST /admin/experiments
