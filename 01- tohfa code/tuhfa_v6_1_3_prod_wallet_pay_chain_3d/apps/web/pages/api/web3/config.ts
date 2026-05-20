
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  res.status(200).json({ 
    chainRpc: process.env.CHAIN_RPC_URL || null,
    contract: process.env.NEXT_PUBLIC_CONTRACT || null 
  });
}
