
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  // TODO: call Tap API with TAP_SECRET to create payment/intent (Apple Pay/mada)
  return res.status(200).json({ ok:true, provider:'tap', sessionId:'demo' });
}
