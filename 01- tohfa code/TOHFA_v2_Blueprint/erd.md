# Data Model (High-Level ERD)

Entities (key):
- User {id, role: VISITOR|ARTISAN|MUSEUM|ADMIN, profile}
- Artisan {id, userId, store, region, specialties[]}
- Museum {id, name, region, contact, galleries[]}
- CraftType {id, name, region, materials[], patterns[]}
- Product {id, artisanId, craftTypeId, status: READY|MADE_TO_ORDER|MUSEUM_GRADE, price, media[], passportId}
- Order {id, buyerId, items[], totals, addressId, status}
- CustomOrder {id, requesterId, artisanId, brief, quotes[], milestones[]}
- Workshop {id, artisanId|museumId, title, schedule, tickets, telemetry?}
- Exhibit {id, museumId, iiifManifestUrl, scenes[], linkedProducts[]}
- Passport {id, productId, qr, nfc, c2paRef, giTag, provenance[]}
- Address {id, userId, splNormalized?, geo}
- Payment {id, orderId, provider, ref, status}
- Shipment {id, orderId, carrier, labelUrl, tracking}
- Consent {id, userId, purpose, grantedAt, withdrawnAt?}

Key relations:
Artisan 1—* Product
Product *—1 CraftType
Museum 1—* Exhibit
Exhibit *—* Product (via linkedProducts)
User 1—* Order ; Order 1—* Shipment ; Order *—* Product (OrderItem)
User 1—* Consent
Passport 1—1 Product
