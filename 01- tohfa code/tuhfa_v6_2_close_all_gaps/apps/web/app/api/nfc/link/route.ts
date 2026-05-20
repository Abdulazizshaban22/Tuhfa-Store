
import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function POST(req: Request){
  const { uid, tokenId, contract, assetId } = await req.json().catch(()=>({}))
  if(!uid || !tokenId) return NextResponse.json({ error:'uid/tokenId required' }, { status:400 })
  await pool.query('insert into provenance(asset_id, token_id, contract, owner, nfc_uid) values ($1,$2,$3,$4,$5)',
    [assetId||null, tokenId, contract||process.env.NEXT_PUBLIC_CONTRACT||null, null, uid])
  return NextResponse.json({ ok:true })
}
