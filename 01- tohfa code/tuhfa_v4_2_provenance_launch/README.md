# Tuhfa v4.2 — Provenance Launch

This delivery contains:
1) **Provenance Chain** (Hardhat + ERC-721 via OpenZeppelin) — `provenance-chain/`
2) **Web API** for minting + **Certificate page** — `apps/web/app/api/provenance/mint`, `apps/web/app/cert/[id]`
3) **Mobile NFC writer** sample — `apps/mobile/app/nfc_write.ts`
4) **XMP pipeline** to embed KHR_xmp_json_ld into GLB — `provenance-xmp/`

## Quick steps

### A. Deploy ERC-721 to Polygon Amoy (80002)
```bash
cd provenance-chain
cp .env.example .env   # fill AMOY_RPC_URL + DEPLOYER_PRIVATE_KEY
pnpm i
pnpm build
pnpm run deploy:amoy
# note the contract address
```

### B. Enable API mint
- Set env in `apps/web/.env`:
```
CHAIN_RPC_URL=https://rpc-amoy.polygon.technology/
WALLET_PRIVATE_KEY=0x...   # funding test wallet
CONTRACT_ADDRESS=0x...
```
- POST to `/api/provenance/mint` with `{ to, tokenUri }`.

### C. NFC — write certificate URL
```ts
await writeCertUrl("https://tuhfa.app/cert/412");
```

### D. Embed XMP into GLB
```bash
cd provenance-xmp
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python add_xmp_to_glb.py input.glb output.glb sample_metadata.json
```

— Generated 2025-11-09