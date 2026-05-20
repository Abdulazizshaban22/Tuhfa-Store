
# TOHFA v3.4 (Minimal Demo)

- WalletConnect/Web3Modal (CDN best-effort) — `/admin/wallets/connect`
- Web NFC write (Scan‑to‑Own URL) — `/admin/web3/nfc-write`
- Certificate API & viewer — `/api/certificate` + `/certificate/view`
- 3D scene + rights box reading `assets.json` — `/museum/immersive`

## Run
Terminal 1:
```
cd apps/api && npm i && npm run dev
```
Terminal 2:
```
cd apps/web && npm i && npm run dev
```

> Set `NEXT_PUBLIC_API_BASE=http://localhost:3001`

Built: 2025-11-08T20:26:31.840306Z
