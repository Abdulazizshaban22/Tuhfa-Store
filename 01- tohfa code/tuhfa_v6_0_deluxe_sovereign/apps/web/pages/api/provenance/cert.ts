
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { id='TUHFA-0001' } = req.query as any;
  const now = new Date().toISOString();
  const payload = {
    '@context': ['https://schema.org', 'https://w3id.org/security/v2'],
    type: ['VisualArtwork','ProvenanceRecord'],
    id,
    title: 'سدو نجدي — أصلية',
    issuer: 'Tuhfa Sovereign',
    issuedAt: now,
    chain: { network: 'polygon', contract: '0xContract', tokenId: '1', owner: '0xOwner' },
    media: { glb: 'https://cdn.tuhfa.sa/assets/asset1.glb#xmp' },
    fixity: { algorithm: 'SHA-256', digest: 'demo' }
  };
  const digest = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  payload.fixity.digest = digest;
  return res.status(200).json(payload);
}
