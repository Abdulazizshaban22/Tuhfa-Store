
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Initiate HyperPay checkout (Apple Pay/mada) — placeholder.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  return res.status(200).json({ ok:true, provider:'hyperpay', checkoutId:'demo' });
}
