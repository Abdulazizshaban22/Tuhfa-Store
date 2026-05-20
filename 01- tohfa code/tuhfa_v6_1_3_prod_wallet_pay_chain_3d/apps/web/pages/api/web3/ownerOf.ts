
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { tokenId='1' } = req.query as any;
  const rpc = process.env.CHAIN_RPC_URL!;
  const contractAddr = process.env.NEXT_PUBLIC_CONTRACT!;
  if(!rpc || !contractAddr) return res.status(400).json({ error:'Missing env' });
  const provider = new ethers.JsonRpcProvider(rpc);
  const abi = ['function ownerOf(uint256 tokenId) view returns (address)'];
  const c = new ethers.Contract(contractAddr, abi, provider);
  try{ const owner = await c.ownerOf(tokenId); return res.status(200).json({ tokenId, owner }); }
  catch(e:any){ return res.status(500).json({ error: e.message || 'ownerOf failed' }); }
}
