
# Tuhfa Mobile — v4.0 (Expo / React Native)

## What you get
- Expo project (iOS + Android) with Router screens:
  - Home, Product (Tap Apple Pay/Mada redirect), Checkout (WebView), Wallet (WalletConnect Modal RN), NFC (read/write NDEF), Certificate, Museum (3D via WebView).
- EAS config (`eas.json`) for build & submit.
- App icons & splash (placeholders).
- NFC entitlements (iOS) + Android permission.
- WalletConnect Modal RN ready (set EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID).

## Quick start
```bash
cd apps/mobile
pnpm i # or npm i / yarn
pnpm start
# To create native projects:
pnpm prebuild
pnpm ios    # or pnpm android
# Build on EAS:
eas login
pnpm build
```

## Environment variables (app.json -> expo.extra / EXPO_PUBLIC_*)
- `EXPO_PUBLIC_API_BASE_URL` — your API host (e.g., https://api.tuhfa.app)
- `EXPO_PUBLIC_WEB_BASE_URL` — your web host (for Checkout/Museum WebView)
- `EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID` — from Reown/WalletConnect dashboard

## Payments
- **Tap Apple Pay/Mada**: We call your backend `/api/payments/tap/create` then open `redirect_url` (requires Tap merchant setup + Apple Pay domain association). Native SDK integration can be added in a follow-up module if needed.
- **HyperPay**: Either WebView to your hosted checkout or integrate native SDKs per platform.

## WalletConnect
Uses `@walletconnect/modal-react-native` — just set your Project ID.

## NFC
Using `react-native-nfc-manager` (works after `expo prebuild` with the provided config plugin).

## Signing
Use **EAS Credentials** to generate and store iOS provisioning profiles / Android keystore automatically.
