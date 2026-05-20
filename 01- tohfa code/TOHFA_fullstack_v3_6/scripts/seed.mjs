
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const items = [
  { id:'p1', slug:'vase-najdi-001', title:'مزهرية نَجدية — 001', description:'مزهرية فخارية بزخارف نَجدية تقليدية', price_cents:25000, currency:'SAR', media_url:'/museum/models/vase.glb' },
  { id:'p2', slug:'abaya-sadu-001', title:'عباءة سدو — 001', description:'نسيج سدو يدوي من الحرفيات', price_cents:55000, currency:'SAR', media_url:null },
  { id:'p3', slug:'ring-hijazi-001', title:'خاتم حجازي فضة — 001', description:'خاتم فضة بنقوش حجازية', price_cents:150000, currency:'SAR', media_url:null }
];

await pool.query('DELETE FROM product_embeddings;');
await pool.query('DELETE FROM products;');

for(const p of items){
  await pool.query('INSERT INTO products(id,slug,title,description,price_cents,currency,media_url) VALUES($1,$2,$3,$4,$5,$6,$7);',
    [p.id,p.slug,p.title,p.description,p.price_cents,p.currency,p.media_url]);
}

console.log('Seeded', items.length, 'products');
process.exit(0);
