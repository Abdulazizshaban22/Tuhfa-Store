
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Placeholder: Create Tap Payment Intent for Apple Pay / mada.
 * Docs: https://developers.tap.company/ (use TAP_SECRET)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  const { amount='100.00', currency='SAR', description='Tuhfa order' } = req.body || {};
  const secret = process.env.TAP_SECRET;
  const base = process.env.TAP_BASE || 'https://api.tap.company/v2';
  if(!secret) return res.status(400).json({ error:'TAP_SECRET missing' });
  // NOTE: In real deployment, call Tap API with Authorization: Bearer <secret>
  // and payload including: amount, currency, description, source (applepay/mada), merchant, and redirect URLs.
  return res.status(200).json({ ok:true, provider:'tap', intent:'placeholder', amount, currency, description });
}
