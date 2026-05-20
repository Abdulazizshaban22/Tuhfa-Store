
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ error:'POST only' });
  const { uid, tokenId, contract, assetId } = req.body || {};
  if(!uid || !tokenId) return res.status(400).json({ error:'uid/tokenId required' });
  try{
    await pool.query('INSERT INTO provenance(asset_id, token_id, contract, owner, nfc_uid) VALUES ($1,$2,$3,$4,$5)',
      [assetId||null, tokenId, contract||process.env.NEXT_PUBLIC_CONTRACT||null, null, uid]);
    return res.status(200).json({ ok:true, uid, tokenId });
  }catch(e:any){
    return res.status(500).json({ error: e.message || 'db error' });
  }
}
