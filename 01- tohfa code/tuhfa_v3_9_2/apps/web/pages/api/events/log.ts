import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method!=='POST') return res.status(405).end();
  const { kind, ref } = req.body || {};
  if(!kind) return res.status(400).json({error:'kind required'});
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try{
    await client.query("INSERT INTO events(kind, ref) VALUES ($1,$2)", [kind, ref || null]);
    return res.status(200).json({ ok:true });
  } catch(e:any){
    return res.status(500).json({ error: e?.message || 'log failed' });
  } finally {
    client.release();
  }
}
