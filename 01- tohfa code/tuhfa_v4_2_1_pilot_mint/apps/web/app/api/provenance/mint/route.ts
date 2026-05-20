import { NextRequest, NextResponse } from 'next/server';
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import abi from '@/provenance/abi/TuhfaNFT.json';

export async function POST(req: NextRequest){
  try{
    const { to, tokenUri } = await req.json();
    const rpc = process.env.CHAIN_RPC_URL!;
    const key = process.env.WALLET_PRIVATE_KEY!;
    const addr = process.env.CONTRACT_ADDRESS!;
    if(!rpc || !key || !addr) throw new Error('Missing chain env');

    const provider = new JsonRpcProvider(rpc);
    const wallet = new Wallet(key, provider);
    const contract = new Contract(addr, abi as any, wallet);
    const tx = await contract.mintTo(to, tokenUri);
    const receipt = await tx.wait();
    return NextResponse.json({ ok:true, txHash: receipt?.hash });
  }catch(e:any){
    return NextResponse.json({ ok:false, error: e?.message||'mint failed' }, { status: 500 });
  }
}