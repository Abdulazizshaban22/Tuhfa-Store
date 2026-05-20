# TOHFA_dev_pack_v2_9 — Live Alerts + SSE + Web3/NFC + Metaverse

## يتضمن
- **Slack Block Kit** تنبيهات غنية + قالب Alertmanager (templates).
- **SSE** لبثّ مؤشرات `/metrics` كل ثانيتين عبر `/admin/metrics/stream` + صفحة حيّة.
- **Web3**: عقود ERC‑721 و ERC‑1155 + سكربت `mint721.ts` (ethers v6).
- **WalletConnect/Web3Modal**: صفحة stub للتهيئة لاحقًا.
- **NFC**: صفحة Web NFC للكتابة (Android Chrome) + ملاحظات iOS/Android.
- **Metaverse**: معرض A‑Frame + عارض three.js (ضع GLTF في `public/models/`).
- **Runbook** لحالات 5xx/P95.

## تعليمات سريعة
- Slack: استخدم `sendSlackBlocks()` مع رابط صورة من Grafana Renderer.
- SSE: اربط الواجهة على `/admin/live` لرؤية التدفق المباشر.
- Web3: انشر العقود عبر Hardhat/Foundry، ثم استخدم `scripts/mint721.ts` للسك.
- NFC: افتح `/nfc/write` على Chrome Android لكتابة URL شهادة/NFT.
- Metaverse: زر `/gallery/aframe` أو `/gallery/three` لإستعراض نموذج GLTF.

— Built at 2025-11-08T20:02:50.246125Z
