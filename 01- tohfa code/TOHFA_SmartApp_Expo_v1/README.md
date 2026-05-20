# TOHFA SmartApp (Expo) v1
Generated: 2025-10-21 08:54

A production-ready mobile app skeleton for iOS/Android built with Expo Router, wired to the TOHFA API.
Includes:
- Products list / details
- Checkout (Host WebView to Tap's hosted page via API)
- NFT ownership widget (server-driven via API)
- QR scanner (expo-camera)
- NFC placeholder (requires custom dev client)

## Quick start
```bash
pnpm i
npx expo start
```
Configure API base in app config or ENV:
- `API_BASE` (defaults to http://localhost:4000)

## Notes
- Checkout uses API endpoint `/payments/checkout?method=hosted` then opens WebView to `transactionUrl`.
- NFC reading requires `react-native-nfc-manager` which needs a custom dev client or bare workflow.
