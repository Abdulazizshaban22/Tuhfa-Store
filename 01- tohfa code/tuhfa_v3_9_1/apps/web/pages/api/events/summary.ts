import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try{
    const r = await client.query("SELECT kind, count(*) cnt FROM events GROUP BY kind ORDER BY kind");
    return res.status(200).json(r.rows);
  }catch(e:any){
    return res.status(500).json({error:e?.message || 'summary failed'});
  }finally{
    client.release();
  }
}
