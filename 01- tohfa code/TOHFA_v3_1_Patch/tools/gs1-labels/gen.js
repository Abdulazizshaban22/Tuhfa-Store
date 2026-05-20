import fs from 'fs'; import path from 'path'; import QRCode from 'qrcode';
const [,, csvFile, outDir='./out'] = process.argv;
if(!csvFile) { console.error('Usage: node gen.js <gtins.csv> [outDir]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const rows = fs.readFileSync(csvFile, 'utf-8').trim().split(/\r?\n/).slice(1);
for(const row of rows){
  const [gtin, externalId] = row.split(',').map(s=>s.trim());
  const url = `https://tohfa.sa/dl/${gtin}`;
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M' });
  const card = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180">
    <rect width="100%" height="100%" fill="#fff"/>
    <g transform="translate(10,10)">
      <g transform="scale(0.9)">${svg}</g>
    </g>
    <text x="160" y="60" font-size="14" font-family="Arial">GTIN: ${gtin}</text>
    <text x="160" y="85" font-size="14" font-family="Arial">ID: ${externalId}</text>
    <text x="160" y="110" font-size="12" font-family="Arial">Scan or tap (NFC)</text>
    <text x="160" y="135" font-size="10" font-family="Arial">https://tohfa.sa/dl/${gtin}</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, `${gtin}.svg`), card, 'utf-8');
  console.log('Label:', gtin);
}
console.log('Done.')
