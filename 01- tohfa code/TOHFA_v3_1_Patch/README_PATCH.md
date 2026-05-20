# TOHFA v3.1 Patch — NFT + GS1 + IIIF
Generated: 2025-10-21 07:58

## 1) NFT Mint (Polygon)
- Files:
  - `apps/api/src/modules/web3/web3.mint.service.ts`
  - `apps/api/src/modules/web3/web3.mint.controller.ts`
  - Add to `web3.module.ts` controllers/providers per `README_MERGE.md` (or replace module).
  - Add `"ethers": "^6.12.x"` to `apps/api/package.json` (see `PACKAGE_PATCH.json`).

- ENV:
  - `WEB3_PRIVATE_KEY=0x...` (minter wallet)
  - `POLYGON_RPC_URL=...` (Amoy testnet or Mainnet)
  - `CHAIN_ID=80002` (Amoy) or `137` (Mainnet)
  - `NFT_CONTRACT_ADDRESS=0x...`
  - `NFT_MINT_FN=safeMint` (or `mint` / `mintTo`)

- Endpoints:
  - `POST /web3/nft/:externalId/mint` body: `{ "ownerAddress": "0x..." }`
  - `GET /web3/nft/:externalId/owner`

## 2) GS1 Digital Link Labels
- Folder: `tools/gs1-labels`
- Usage:
  ```bash
  pnpm i
  pnpm -F gs1-labels gen tools/gs1-labels/gtins.sample.csv ./labels_out
  ```
- اكتب نفس الرابط على شريحة NFC (NDEF URI): `https://tohfa.sa/dl/<GTIN>`

## 3) IIIF Exhibitions (10)
- Ready manifests in `content/iiif/manifests/*.json`
- Hook into your web IIIF viewer by listing these manifests and passing URLs to OpenSeadragon or any IIIF client.

## 4) Web Ownership UI
- Add ownership widget to product page:
  - See `apps/web/app/product/[id]/page.patch.txt` and `OwnerCheck.tsx`

## Quick Unblock (if you got stuck)
- Docker up: `cd infra && docker compose -f docker-compose.prod.yml up --build`
- DB ready then prisma: `pnpm --filter api prisma:migrate && pnpm --filter api seed`
- API check: `curl http://localhost:4000/products`
- Polygon vars set? Test provider with `CHAIN_ID` and `POLYGON_RPC_URL` (Amoy 80002 / Mainnet 137).
- Missing ABI method? Set `NFT_MINT_FN` env accordingly.

