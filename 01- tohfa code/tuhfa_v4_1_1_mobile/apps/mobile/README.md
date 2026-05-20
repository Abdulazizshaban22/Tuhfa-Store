
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


---

## v4.1 — Native SDK & Store Prep

### 1) Payments (Native)
- **Tap (goSell SDK)**: add AndroidX dependency via Gradle and iOS via CocoaPods; replace placeholders with exact versions from Tap docs.
- **HyperPay (OPPWA)**: add native SDK on iOS (xcframework) and Android (Gradle/Maven).

Bridges at `app/native/TapBridge.ts` and `app/native/HyperPayBridge.ts` show call sites. Implement native modules to invoke SDK flows (charge, authorize, Apple Pay, Mada, STC Pay).

### 2) Push (FCM)
- Place `android/app/google-services.json` and `ios/GoogleService-Info.plist` with real keys.
- After `expo prebuild`, add google-services plugin and Firebase BOM to Android, and Firebase pods to iOS.
- Request permission on iOS and get FCM token; handle background/foreground messages.

### 3) Analytics
- **GA4** via `@react-native-firebase/analytics` (already wired in `app/analytics.ts`).
- **Mixpanel** via `mixpanel-react-native` (init with `EXPO_PUBLIC_MIXPANEL_TOKEN`).

### 4) EAS Credentials & Submit
- iOS: use `eas credentials` to generate/assign signing (App ID, Profiles). Then `eas build -p ios --profile production` and submit via `eas submit -p ios`.
- Android: generate keystore via EAS and build AAB `eas build -p android --profile production`, then submit `eas submit -p android`.

### 5) TestFlight & Closed Testing
- Upload .ipa to App Store Connect -> TestFlight -> add **Internal testers**.
- Upload .aab to Play Console -> **Closed testing** track -> add testers.

See inline *.hint.txt files under `android/` and `ios/` for exact edits after prebuild.


---
## v4.1.1 — Native Bridges & Test Upload

### What changed
- iOS Swift bridges: `ios/native-bridges/TapBridge.swift`, `ios/native-bridges/HyperPayBridge.swift` (copy to ios/ after `expo prebuild` and add to target).
- Android Kotlin bridges: `android/native-bridges/TapBridgeModule.kt`, `android/native-bridges/HyperPayBridgeModule.kt` (copy to `android/app/src/main/java/<package>/`).
- JS wrappers: `app/native/tap.native.ts`, `app/native/hyperpay.native.ts`.
- Push: `app/notifications.ts` + background handler registration in `index.js`.
- Store metadata templates under `store/`.

### After expo prebuild
- iOS: add CocoaPods (goSellSDK / Firebase) + link OPPWAMobile xcframework.
- Android: add Gradle deps for Tap (AndroidX) + OPPWA + Firebase BOM + Google services plugin.

### Build & Submit
- `eas build -p ios --profile production && eas submit -p ios`
- `eas build -p android --profile production && eas submit -p android`

