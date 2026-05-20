
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Link NFC UID to tokenId in DB (requires real DB pool; kept as demo).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  const { uid, tokenId } = req.body || {};
  if(!uid || !tokenId) return res.status(400).json({ error:'uid/tokenId required' });
  return res.status(200).json({ ok:true, uid, tokenId });
}
