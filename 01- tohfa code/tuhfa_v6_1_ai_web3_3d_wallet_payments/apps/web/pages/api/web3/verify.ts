
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { tokenId='1' } = req.query as any;
  // TODO: read ownerOf(tokenId) from chain
  return res.status(200).json({ tokenId, owner:'0xOwner', contract: process.env.NEXT_PUBLIC_CONTRACT || '0xContract' });
}
