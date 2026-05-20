import { Pool } from 'pg';
import fetch from 'node-fetch';
import FormData from 'form-data';

const AI = process.env.AI_BASE_URL || 'http://localhost:8079';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function embedImageUrl(url:string){
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const fd = new FormData();
  // @ts-ignore
  fd.append('image', buf, { filename: 'img.jpg', contentType: 'image/jpeg' });
  const r = await fetch(`${AI}/embed_image`, { method:'POST', body: fd as any });
  const j = await r.json();
  return j.embedding as number[];
}

async function main(){
  const client = await pool.connect();
  try{
    const { rows } = await client.query("SELECT id, image_url FROM products ORDER BY id");
    for(const row of rows){
      try{
        const emb = await embedImageUrl(row.image_url);
        await client.query("INSERT INTO product_embeddings(product_id, embedding) VALUES ($1,$2) ON CONFLICT (product_id) DO UPDATE SET embedding=excluded.embedding", [row.id, emb]);
        console.log('Indexed', row.id);
      }catch(e:any){
        console.error('Failed', row.id, e?.message);
      }
    }
  } finally {
    client.release();
  }
}

main().catch(e=>{ console.error(e); process.exit(1); });
