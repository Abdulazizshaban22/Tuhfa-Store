import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { query, limit = 8 } = req.body || {};
  if(typeof query !== 'string' || !query.trim()) return res.status(400).json({error:'query required'});
  const ai = process.env.AI_BASE_URL || 'http://localhost:8079';
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try{
    // Get text embedding from AI (CLIP text => 512-d)
    const fd = new URLSearchParams(); fd.set('text', query);
    const eresp = await fetch(`${ai}/embed_text`, { method:'POST', body: fd });
    const ejson = await eresp.json();
    const embedding = ejson.embedding;
    const client = await pool.connect();
    try{
      const result = await client.query(
        "SELECT p.id, p.title, p.price_sar, p.image_url, 1 - (e.embedding <=> $1) AS score          FROM product_embeddings e JOIN products p ON p.id = e.product_id          ORDER BY e.embedding <-> $1 ASC LIMIT $2",
        [embedding, limit]
      );
      return res.status(200).json(result.rows);
    } finally {
      client.release();
    }
  }catch(e:any){
    return res.status(500).json({error: e?.message || 'search failed'});
  }
}
