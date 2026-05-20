# Tuhfa Provenance — Chain (v4.2)

- Standard: ERC-721 (OpenZeppelin).
- Network: Polygon **Amoy** testnet (Chain ID **80002**).
- Scripts: `deploy:amoy`, `mint:amoy`.

## Quickstart
```bash
cd provenance-chain
cp .env.example .env
# fill AMOY_RPC_URL, DEPLOYER_PRIVATE_KEY
pnpm i
pnpm build
pnpm run deploy:amoy
# export CONTRACT_ADDRESS from output
CONTRACT_ADDRESS=0x... MINT_TO=0xYourTestWallet TOKEN_URI=https://... pnpm run mint:amoy
```