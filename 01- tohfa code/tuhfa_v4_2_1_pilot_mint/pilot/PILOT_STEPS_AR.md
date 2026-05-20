# خطوات بايلوت السكّ + NFC — تحفة v4.2.1

## 1) نشر العقد على Amoy
```bash
cd provenance-chain
cp .env.example .env
# عدّل DEPLOYER_PRIVATE_KEY + AMOY_RPC_URL (اختياري)
pnpm i && pnpm build
pnpm run deploy:amoy   # دوّن CONTRACT_ADDRESS
```

## 2) رفع أصول IPFS
- ارفع `pilot/ipfs/aseeri_bracelet.png` و `pilot/ipfs/metadata.json` إلى IPFS.
- حدّث قيمة `image` داخل metadata إلى `ipfs://<CID>/aseeri_bracelet.png` (إن لزم).
- سجّل رابط HTTP للـ metadata (بوابة IPFS) لاستخدامه في السكّ.

## 3) سكّ الرمز
```bash
cd provenance-chain
export CONTRACT_ADDRESS=0xYOUR_CONTRACT
export MINT_TO=0xYOUR_TEST_WALLET
export TOKEN_URI=https://ipfs.io/ipfs/<CID>/metadata.json
pnpm run mint:amoy
```

## 4) ربط NFC
- في تطبيق React Native استخدم:
```ts
await writeCertUrl("https://tuhfa.app/cert/412");
```
- جرّب تمرير الهاتف على الوسم — يجب أن تفتح صفحة الشهادة.

## 5) إدراج XMP داخل GLB (اختياري الآن)
```bash
cd provenance-xmp
python add_xmp_to_glb.py input.glb output.glb provenance-xmp/sample_metadata.json
```

— وُلدت الحزمة في: 2025-11-09