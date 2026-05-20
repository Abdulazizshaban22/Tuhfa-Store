
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenId, price } = req.body || {};
  // Placeholder: خزّن الإدراج في DB، أو وقّع أمر بيع EIP-712، أو أنشئ فاتورة Tap
  res.status(200).json({ ok:true, tokenId, price, listingId: Math.floor(Math.random()*1e6) });
}
