
# Tuhfa v4.3.1 — Native Bridges & Store Upload

**What you have**
- RN native modules scaffolds (iOS Swift / Android Kotlin) for **Tap** & **HyperPay**.
- JS wrapper (`src/payments`) and a demo screen.
- Placeholder for Apple Pay domain verification file (`webroot/.well-known/...`).
- Store guides (TestFlight / Google Play).

## Link the modules
- iOS: add Swift files to the Xcode workspace; run `pod install` after adding SDKs; ensure Apple Pay merchant + entitlement.
- Android: register `TuhfaTapPackage` & `TuhfaHyperPayPackage` in `MainApplication`.

## Replace TODOs with actual SDK calls
- Tap: initialize SDK, create charge, Apple Pay / mada as per gateway docs.
- HyperPay: create checkoutId on server, pass to SDK, handle callbacks.

— Generated 2025-11-09
