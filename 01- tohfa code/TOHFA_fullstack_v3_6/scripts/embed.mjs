
import 'dotenv/config';
import fetch from 'node-fetch';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const ai = process.env.AI_URL || 'http://localhost:8079';

const r = await pool.query('SELECT id, title, description FROM products;');
for(const p of r.rows){
  const text = `${p.title} — ${p.description||''}`;
  const resp = await fetch(ai + '/embed', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ text }) });
  const { vector } = await resp.json();
  await pool.query('INSERT INTO product_embeddings(product_id, embedding) VALUES($1, $2) ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding;', [p.id, vector]);
  console.log('Embedded', p.id);
}
process.exit(0);
