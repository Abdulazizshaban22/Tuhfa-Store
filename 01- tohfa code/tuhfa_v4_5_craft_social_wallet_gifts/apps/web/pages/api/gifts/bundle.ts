
import type { NextApiRequest, NextApiResponse } from 'next';
/** ينشئ شهادة JSON-LD موقّعة للحزمة؛ يمكن ربطها بـ NFC/XMP لاحقاً */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items = [] } = req.body || {};
  const cert = {
    '@context': ['https://schema.org', 'https://w3id.org/security/v2'],
    '@type': 'CreativeWork',
    name: 'Tuhfa Corporate Gift Bundle',
    description: 'شهادة موقّعة رقمياً لحزمة هدايا مؤسسية',
    dateCreated: new Date().toISOString(),
    items,
    proof: { type: 'DataIntegrityProof', created: new Date().toISOString(), cryptosuite: 'ecdsa-p256-sha256', jws: 'PLACEHOLDER' }
  };
  res.status(200).json({ ok:true, certificate: cert, qr: '/api/gifts/qr?id=demo' });
}
