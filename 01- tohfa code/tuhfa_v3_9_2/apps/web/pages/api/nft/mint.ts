import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

const ABI = [
  "function mintTo(address to, string tokenURI) public returns (uint256)"
];

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const { to, tokenURI } = req.body || {};
  const rpc = process.env.CHAIN_RPC_URL;
  const pk  = process.env.WALLET_PRIVATE_KEY;
  const ca  = process.env.CONTRACT_ADDRESS;
  if(!rpc || !pk || !ca) return res.status(400).json({error:'Missing chain env'});
  try{
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet   = new ethers.Wallet(pk, provider);
    const c = new ethers.Contract(ca, ABI, wallet);
    const tx = await c.mintTo(to, tokenURI);
    const rc = await tx.wait();
    return res.status(200).json({hash: tx.hash, receipt: rc});
  }catch(e:any){
    return res.status(500).json({error:e?.message || 'Mint failed'});
  }
}
