
import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Stub endpoint — integrate ethers + RPC to mint on Polygon zkEVM.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).json({ error:'POST only' });
  // TODO: implement ethers sign & mint
  return res.status(200).json({ ok:true, tx:'0x-demo' });
}
