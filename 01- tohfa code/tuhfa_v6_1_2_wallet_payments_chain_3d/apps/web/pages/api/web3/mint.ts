
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method==='POST' && req.body?.action==='sign'){
    // Demo: return a fake signature-like response (no provider in this environment)
    return res.status(200).json({ ok:true, sig:'0xSIGNED_DEMO' });
  }
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  const rpc = process.env.CHAIN_RPC_URL!;
  const pk = process.env.CONTRACT_PRIVATE_KEY!;
  const contractAddr = process.env.NEXT_PUBLIC_CONTRACT!;
  if(!rpc || !pk || !contractAddr) return res.status(400).json({ error:'Missing env (CHAIN_RPC_URL, CONTRACT_PRIVATE_KEY, NEXT_PUBLIC_CONTRACT)' });
  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(pk, provider);
  // Minimal ERC721 mint ABI (assumes safeMint(address,string) exists)
  const abi = ['function safeMint(address to, string uri) public returns (uint256)'];
  const c = new ethers.Contract(contractAddr, abi, wallet);
  const { to='0x0000000000000000000000000000000000000000', uri='ipfs://metadata.json' } = req.body || {};
  try{
    const tx = await c.safeMint(to, uri);
    return res.status(200).json({ ok:true, tx: tx.hash });
  }catch(e:any){
    return res.status(500).json({ error: e.message || 'mint failed' });
  }
}
