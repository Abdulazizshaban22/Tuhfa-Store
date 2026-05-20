
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Placeholder: أعِد رابط شهادة عامة يمكن وضعه على NFC أو QR
  const { id='demo' } = req.query;
  res.status(200).json({ url: `https://tuhfa.app/cert/${id}` });
}
