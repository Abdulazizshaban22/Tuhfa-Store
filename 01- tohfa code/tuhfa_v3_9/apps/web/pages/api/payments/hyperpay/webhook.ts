import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * HyperPay typically posts transaction result via client callback/redirect or server-to-server (if configured).
 * Keep this endpoint to receive server notifications (customize per your account).
 */
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).end();
  // TODO: verify signature if enabled; then persist payment status
  return res.status(200).json({ ok:true });
}
