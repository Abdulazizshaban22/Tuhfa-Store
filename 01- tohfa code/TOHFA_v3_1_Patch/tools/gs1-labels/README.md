# GS1 QR/NFC Labels
- يولد ملفات SVG لرموز QR بصيغة **GS1 Digital Link** لكل GTIN.
- الناتج مناسب للطباعة على ملصقات ونقش NDEF URI على شرائح NTAG.

Usage:
```bash
pnpm i
pnpm gen ./gtins.csv ./out
# CSV format: gtin,externalId
```

NFC (NDEF URI):
- اكتب نفس رابط GS1 على الشريحة: `https://tohfa.sa/dl/<GTIN>`
- استخدم تطبيق NFC Writer لكتابة URI (NTAG213/215).
