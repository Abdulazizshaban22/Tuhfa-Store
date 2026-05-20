import fs from 'fs'; import path from 'path'; import { sign } from 'c2pa'; import mime from 'mime';
const [,, src, outDir='./signed'] = process.argv;
if(!src) { console.error('Usage: node sign.js <image> [outDir]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const img = fs.readFileSync(src);
const label = path.basename(src);
const manifest = {
  title: label,
  assertions: [
    { label:'c2pa.actions', data: [{ action: 'c2pa.created', softwareAgent: 'TOHFA-C2PA' }] },
    { label:'tohfa.product', data: { source: 'artisan', locale: 'ar-SA' } }
  ]
};
const res = await sign(img, { type: mime.getType(src) || 'image/jpeg' }, { manifest });
fs.writeFileSync(path.join(outDir, label), Buffer.from(res)); console.log('Signed:', label);
