# TOHFA Mobile (Expo) — Production v1
Generated: 2025-10-21 09:07

This bundle is ready to build **iOS (.ipa)** & **Android (.aab)** using **EAS Build**.
It is wired to the TOHFA API and includes production build profiles and store assets.

## Quick start
```bash
# 0) Install deps
pnpm i

# 1) Set API base (env)
# edit app.json -> expo.extra.API_BASE = "https://api.tohfa.sa"

# 2) Login to Expo
npx expo login

# 3) Build
eas build -p ios --profile production
eas build -p android --profile production

# (optional) Submit
eas submit -p ios --latest
eas submit -p android --latest
```
> EAS will guide you to **generate and manage credentials** for both platforms.

See `docs/IOS_Submission.md` and `docs/Android_Submission.md`.
