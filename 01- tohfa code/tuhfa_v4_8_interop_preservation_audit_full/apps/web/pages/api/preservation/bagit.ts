
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/** BagIt manifest demo (RFC 8493) */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { assetId='1' } = req.query as any;
  const payload = [`data/asset_${assetId}.tif`, `data/asset_${assetId}.json`];
  const manifest = payload.map(p => `${crypto.createHash('sha256').update(p).digest('hex')}  ${p}`).join('\n');
  const bagit = `BagIt-Version: 1.0\nTag-File-Character-Encoding: UTF-8\n`;
  const out = {
    'bagit.txt': bagit,
    'manifest-sha256.txt': manifest,
    'bag-info.txt': `Source-Organization: Tuhfa\nBagging-Date: ${new Date().toISOString().slice(0,10)}\n`,
    'payload': payload
  };
  res.status(200).json(out);
}
