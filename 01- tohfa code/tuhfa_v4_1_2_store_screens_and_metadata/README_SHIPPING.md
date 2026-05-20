# Tuhfa v4.1.2 — Screens & Metadata (iOS + Android)

This package includes store-ready screenshots, icons, feature graphic, bilingual metadata, and an **EAS Metadata** config.

## What’s inside
- `ios/screenshots/iphone-6.9/*.png` — App Store 6.9″ portrait set.
- `ios/screenshots/ipad-13/*.png` — iPad 13″ first screenshot.
- `ios/marketing-icon-1024.png` — iOS marketing icon.
- `android/play-icon-512.png` — 512×512 Play Store icon.
- `android/feature-graphic-1024x500.png` — Feature graphic 1024×500.
- `android/screenshots/phone-1080x1920/*.png` — Phone screenshots set.
- `app_store_metadata.json` — Human‑readable product page text (AR/EN).
- `store.config.json` — **EAS Metadata** config (AR/EN) ready for `eas metadata:push`.
- `common/privacy_policy_ar_en.md` — Privacy policy template.

## Push to stores with EAS
```bash
# Install latest EAS CLI
npm i -g eas-cli

# Authenticate
eas login

# From your project root (copy store.config.json there first)
eas metadata:push
```

## Notes
- Apple name ≤30 chars, subtitle ≤30, promo text ≤170, desc ≤4000.
- Google Play: Icon 512×512 PNG ≤1MB; Feature Graphic 1024×500 JPEG/PNG (no alpha).
- Update texts and assets as needed before pushing.

— Generated on 2025-11-08
