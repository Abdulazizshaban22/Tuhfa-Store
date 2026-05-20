
import express from 'express';
import cors from 'cors';
import { verifyTypedData, keccak256, toUtf8Bytes, randomBytes } from 'ethers';

const app = express();
app.use(cors({ origin:true, credentials:true }));
app.use(express.json({ limit:'2mb' }));

// In-memory store for demo
const STORE = {
  products: [{ id: 'p1', slug: 'vase-najdi-001', name: 'مزهرية نَجدية — 001', priceCents: 25000, currency: 'SAR', mediaUrl: '/museum/models/vase.glb' }],
  intents: {},
  orders: [],
  nfcLinks: {}
};

app.get('/api/admin/metrics', (req,res)=> {
  const paid = STORE.orders.filter(o=>o.status==='paid').length;
  const pending = STORE.orders.filter(o=>o.status==='pending').length;
  const signed = STORE.orders.filter(o=>o.status==='signed').length;
  res.json({ orders: { paid, pending, signed } });
});

app.get('/api/admin/metrics/daily', (req,res)=> {
  res.json({ items: [] });
});

app.post('/api/admin/web3/nfc/hash', (req,res)=>{
  const uid = String(req.body?.uid||'');
  if (!uid) return res.status(400).json({ error:'uid required' });
  const tagHash = keccak256(toUtf8Bytes(uid));
  res.json({ tagHash });
});

app.post('/api/admin/web3/eip712/purchase-typed-data', (req,res)=>{
  const { chainId=1, productId='p1', qty=1 } = req.body||{};
  const p = STORE.products.find(x=>x.id===productId) || STORE.products[0];
  const priceCents = p.priceCents * Number(qty);
  const expires = Math.floor(Date.now()/1000) + 600;
  const nonce = keccak256(randomBytes(32));
  const domain = { name: 'TohfaCheckout', version: '1', chainId: Number(chainId), verifyingContract: '0x0000000000000000000000000000000000000000' };
  const types = { PurchaseIntent: [
    { name:'productId', type:'string' },
    { name:'qty', type:'uint256' },
    { name:'priceCents', type:'uint256' },
    { name:'currency', type:'string' },
    { name:'expires', type:'uint256' },
    { name:'nonce', type:'bytes32' }
  ]};
  const message = { productId: p.id, qty: String(qty), priceCents: String(priceCents), currency: p.currency, expires: String(expires), nonce };
  const intentId = 'i_' + Date.now();
  STORE.intents[intentId] = { productId: p.id, qty: Number(qty), priceCents, currency: p.currency, expires, nonce };
  res.json({ intentId, domain, types, primaryType: 'PurchaseIntent', message });
});

app.post('/api/admin/web3/eip712/verify-purchase', (req,res)=>{
  const { signature, typedData, intentId } = req.body||{};
  if (!signature || !typedData || !intentId) return res.status(400).json({ error:'missing fields' });
  const intent = STORE.intents[intentId];
  if (!intent) return res.status(404).json({ error:'intent not found' });
  const { domain, types, message } = typedData;
  if (Number(message.expires) < Math.floor(Date.now()/1000)) return res.status(400).json({ error:'expired' });
  if (String(message.nonce).toLowerCase() !== String(intent.nonce).toLowerCase()) return res.status(400).json({ error:'nonce mismatch' });
  const signer = verifyTypedData(domain, types, message, signature);
  const orderId = 'o_' + Date.now();
  STORE.orders.push({ id: orderId, status:'signed', totalCents:intent.priceCents, currency:intent.currency, buyerAddress: signer, signature, nonce: intent.nonce, items:[{ productId:intent.productId, quantity:intent.qty, unitCents: intent.priceCents/intent.qty }] });
  res.json({ ok:true, orderId, signer });
});

app.get('/api/certificate', (req,res)=>{
  const { tagHash, contract, tokenId } = req.query;
  let link = null;
  if (tagHash && STORE.nfcLinks[tagHash]) link = STORE.nfcLinks[tagHash];
  if (!link && contract && tokenId) {
    for (const k in STORE.nfcLinks) {
      const v = STORE.nfcLinks[k]; if (v.contract===contract && v.tokenId===String(tokenId)) { link = v; break; }
    }
  }
  if (!link) return res.json({ ok:false, reason:'not_found' });
  const product = STORE.products.find(p=>p.id===link.productId)||null;
  res.json({ ok:true, link, product });
});

app.get('/api/products', (req,res)=> res.json({ items: STORE.products }));

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log('TOHFA API (minimal) on http://localhost:'+port));
