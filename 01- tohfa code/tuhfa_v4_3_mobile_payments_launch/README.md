
# Tuhfa v4.3 — Mobile & Payments Launch (Scaffold)

This package scaffolds the mobile (Expo) + web checkout + env templates to integrate:
- **Tap Payments** (Apple Pay + mada) or **HyperPay** (mada + brands) via native SDKs.
- **WalletConnect (Reown AppKit)** for wallet login (optional).
- **NFC Scan-to-Own** (React-Native).
- **Legal** pages (Terms / Refund / Privacy) for store compliance.

## 1) Mobile (Expo + EAS)
- Configure `apps/mobile/app.json` (bundle IDs) and `eas.json`.
- Build:
```bash
cd apps/mobile
npm i -g eas-cli expo-cli
eas build --profile development --platform all
```
- Replace `src/payments/checkout.ts` with real native bridges (Tap/HyperPay).

## 2) Web Checkout
- Implement gateway of choice on `/app/checkout/page.tsx` and server routes.
- Apple Pay requires merchant ID + domain verification and wallet sheet on iOS/Safari.

## 3) Env
Copy `.env.example` → `.env` and fill secrets.

— Generated 2025-11-09
