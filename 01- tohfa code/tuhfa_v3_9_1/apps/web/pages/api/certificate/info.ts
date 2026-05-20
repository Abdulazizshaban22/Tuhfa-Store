import type { NextApiRequest, NextApiResponse } from 'next';
import { Address, createPublicClient, http, getContract } from 'viem';
import { polygonAmoy } from 'viem/chains';

const ABI = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const tokenId = req.query.tokenId as string;
  if(!tokenId) return res.status(400).json({error:'tokenId required'});
  const chainRpc = process.env.CHAIN_RPC_URL || 'https://rpc-amoy.polygon.technology';
  const address = (process.env.ERC721_ADDRESS || process.env.CONTRACT_ADDRESS || '') as Address;
  if(!address) return res.status(400).json({error:'Missing contract address'});

  const client = createPublicClient({ chain: polygonAmoy, transport: http(chainRpc) });
  const contract = getContract({ address, abi: ABI as any, client });
  try{
    const [owner, tokenURI] = await Promise.all([
      contract.read.ownerOf([BigInt(tokenId)]),
      contract.read.tokenURI([BigInt(tokenId)])
    ]);
    return res.status(200).json({ tokenId, owner, tokenURI });
  }catch(e:any){
    return res.status(500).json({error: e?.message || 'read failed'});
  }
}
