
# TOHFA v3.5 — AppKit + Wagmi + NFC متقدم + XMP

## الجديد
- **Reown AppKit + Wagmi (بدون CDN):** تم دمج AppKit عبر الحزم الرسمية مع Wagmi/Viem. أضف `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` لتمكين الاتصال. راجع أدلة AppKit/Wagmi. 
- **NFC سجلات متعددة + Scan‑to‑View:** صفحة `/admin/web3/nfc-advanced` تكتب (URL + نص موقّع + JSON) وفق Web NFC، مع أزرار كتابة/مسح. 
- **Pipeline حقوق داخل glTF:** سكربت `tools/xmp-inject.mjs` يحقن بيانات KHR_xmp_json_ld (العنوان/المؤلف/الرخصة) باستخدام glTF-Transform.

## التشغيل
Terminal 1 — API:
```bash
cd apps/api && npm i && npm run dev
# http://localhost:3001
```

Terminal 2 — Web:
```bash
cd ../web
echo "NEXT_PUBLIC_API_BASE=http://localhost:3001" > .env.local
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID" >> .env.local
npm i
npm run dev
# http://localhost:3000
```

روابط:
- اتصال المحافظ (AppKit): `/admin/wallets/connect`
- NFC متقدم (كتابة/مسح): `/admin/web3/nfc-advanced`
- مسّاح بسيط: `/admin/web3/nfc-scan`
- شهادة المصادقة: `/certificate/view`
- مشهد 3D + حقوق: `/museum/immersive`

## مراجع تقنية مفيدة
- Reown AppKit (خليفة Web3Modal) + الهجرة: docs.reown.com  / npm web3modal → reown.  
- Wagmi + Viem (Connect Wallet وموائمات): wagmi.sh / viem.sh.  
- Web NFC: W3C Spec + MDN (NDEFReader.write/scan).  
- KHR_xmp_json_ld: Khronos blog + glTF-Transform KHRXMP + CLI.

Build time: 2025-11-08T20:29:30.748845Z
