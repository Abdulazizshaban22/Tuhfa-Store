
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const ABI = [
  'function safeMint(address to, string tokenURI) public returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)'
]
function provider(){ const rpc = process.env.CHAIN_RPC_URL; if(!rpc) throw new Error('CHAIN_RPC_URL missing'); return new ethers.JsonRpcProvider(rpc) }
function wallet(p:any){ const pk = process.env.CONTRACT_PRIVATE_KEY; if(!pk) throw new Error('CONTRACT_PRIVATE_KEY missing'); return new ethers.Wallet(pk,p) }
function contract(s:any){ const addr = process.env.NEXT_PUBLIC_CONTRACT; if(!addr) throw new Error('NEXT_PUBLIC_CONTRACT missing'); return new ethers.Contract(addr, ABI, s) }

export async function POST(req: Request){
  const { to, tokenURI } = await req.json().catch(()=>({}))
  if(!to || !tokenURI) return NextResponse.json({ error:'to/tokenURI required' }, { status: 400 })
  const p = provider(); const w = wallet(p); const c = contract(w)
  const tx = await c.safeMint(to, tokenURI); const r = await tx.wait()
  return NextResponse.json({ tx: r?.hash || tx?.hash })
}
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const tokenId = searchParams.get('tokenId')
  if(!tokenId) return NextResponse.json({ error:'tokenId required' }, { status: 400 })
  const p = provider(); const c = contract(p)
  const owner = await c.ownerOf(BigInt(tokenId))
  return NextResponse.json({ tokenId, owner })
}
