
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import fetch from 'node-fetch';
import { verifyTypedData, keccak256, toUtf8Bytes, randomBytes } from 'ethers';

const app = express();
app.use(cors({ origin:true, credentials:true }));
app.use(express.json({ limit:'4mb' }));

// ---------- DB
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/tohfa' });

// ---------- Boot helpers
async function query(q, params){ const r = await pool.query(q, params||[]); return r; }

// ---------- Init schema (pgvector + tables)
app.post('/api/setup/init', async (req,res)=>{
  try{
    await query(`CREATE EXTENSION IF NOT EXISTS vector;`);
    await query(`CREATE TABLE IF NOT EXISTS products(
      id TEXT PRIMARY KEY, slug TEXT UNIQUE, title TEXT NOT NULL, description TEXT, price_cents INT NOT NULL, currency TEXT NOT NULL DEFAULT 'SAR',
      media_url TEXT, created_at TIMESTAMPTZ DEFAULT now()
    );`);
    await query(`CREATE TABLE IF NOT EXISTS product_embeddings(
      product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
      embedding vector(384)
    );`);
    await query(`CREATE TABLE IF NOT EXISTS orders(
      id TEXT PRIMARY KEY, buyer_address TEXT, total_cents INT, currency TEXT, status TEXT, created_at TIMESTAMPTZ DEFAULT now()
    );`);
    res.json({ ok:true });
  }catch(e){ res.status(500).json({ ok:false, error: String(e) }); }
});

// ---------- Products
app.get('/api/products', async (req,res)=>{
  const r = await query('SELECT id, slug, title, description, price_cents, currency, media_url FROM products ORDER BY created_at DESC LIMIT 200;');
  res.json({ items: r.rows });
});

app.post('/api/products', async (req,res)=>{
  const { id, slug, title, description, price_cents, currency='SAR', media_url } = req.body||{};
  if (!id || !slug || !title || !price_cents) return res.status(400).json({ error:'missing fields' });
  await query('INSERT INTO products(id,slug,title,description,price_cents,currency,media_url) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING;', [id, slug, title, description||'', price_cents, currency, media_url||null]);
  res.json({ ok:true });
});

// ---------- Embedding indexer (calls AI service)
app.post('/api/embed/index', async (req,res)=>{
  const { product_id, text } = req.body||{};
  if (!product_id || !text) return res.status(400).json({ error:'product_id & text required' });
  const ai = process.env.AI_URL || 'http://localhost:8079';
  const resp = await fetch(ai + '/embed', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ text }) });
  if (!resp.ok) return res.status(500).json({ error:'AI error' });
  const { vector } = await resp.json();
  await query('INSERT INTO product_embeddings(product_id, embedding) VALUES($1, $2) ON CONFLICT (product_id) DO UPDATE SET embedding = EXCLUDED.embedding;', [product_id, vector]);
  res.json({ ok:true });
});

// ---------- Similarity search (cosine distance)
app.get('/api/search-similar', async (req,res)=>{
  const q = String(req.query.q||'').trim();
  if (!q) return res.status(400).json({ error:'q required' });
  const ai = process.env.AI_URL || 'http://localhost:8079';
  const resp = await fetch(ai + '/embed', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ text: q }) });
  if (!resp.ok) return res.status(500).json({ error:'AI error' });
  const { vector } = await resp.json();
  const sql = `
    SELECT p.id, p.slug, p.title, p.price_cents, p.currency, p.media_url,
           1 - (pe.embedding <=> $1::vector) AS similarity
    FROM product_embeddings pe
    JOIN products p ON p.id = pe.product_id
    ORDER BY pe.embedding <-> $1::vector
    LIMIT 12;
  `;
  const r = await query(sql, [vector]);
  res.json({ items: r.rows });
});

// ---------- PDPL Requests placeholders
app.post('/api/pdpl/export', async (req,res)=> res.json({ ok:true, ticket:'PDPL-EXPORT-'+Date.now() }));
app.post('/api/pdpl/delete', async (req,res)=> res.json({ ok:true, ticket:'PDPL-DELETE-'+Date.now() }));

// ---------- Web3: NFC hash + EIP-712
app.post('/api/web3/nfc/hash', (req,res)=>{
  const uid = String(req.body?.uid||''); if (!uid) return res.status(400).json({ error:'uid required' });
  const tagHash = keccak256(toUtf8Bytes(uid));
  res.json({ tagHash });
});
app.post('/api/web3/eip712/purchase-typed', (req,res)=>{
  const { chainId=1, productId, qty=1, currency='SAR', priceCents } = req.body||{};
  const expires = Math.floor(Date.now()/1000)+600;
  const nonce = keccak256(randomBytes(32));
  const domain = { name:'TohfaCheckout', version:'1', chainId:Number(chainId), verifyingContract:'0x0000000000000000000000000000000000000000' };
  const types = { PurchaseIntent:[
    {name:'productId',type:'string'},
    {name:'qty',type:'uint256'},
    {name:'priceCents',type:'uint256'},
    {name:'currency',type:'string'},
    {name:'expires',type:'uint256'},
    {name:'nonce',type:'bytes32'}
  ]};
  const message = { productId, qty:String(qty), priceCents:String(priceCents), currency, expires:String(expires), nonce };
  res.json({ domain, types, primaryType:'PurchaseIntent', message });
});

// ---------- Certificate lookup placeholder
app.get('/api/certificate', async (req,res)=> res.json({ ok:false, reason:'not_bound' }));

// ---------- Start
const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log('TOHFA API v3.6 on http://localhost:'+port));
