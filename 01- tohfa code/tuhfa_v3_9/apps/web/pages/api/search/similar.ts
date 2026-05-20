import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

/**
 * POST /api/search/similar
 * body: { embedding: number[], limit?: number }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { embedding, limit = 8 } = req.body || {};
  if(!Array.isArray(embedding) || embedding.length === 0) {
    return res.status(400).json({error:'embedding required'});
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try{
    const q = `
      SELECT p.id, p.title, p.price_sar, p.image_url,
             1 - (e.embedding <=> cube(array[${','.join(['%s']*3)]})) as score
      FROM product_embeddings e
      JOIN products p ON p.id = e.product_id
      ORDER BY e.embedding <-> cube(array[${','.join(['%s']*3)]}) ASC
      LIMIT $1
    `;
    // Note: For pgvector in JS, prefer using 'embedding <-> $1' with 'toSql' from pgvector-js.
    // To keep it simple, we bind as text and let the server cast.
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