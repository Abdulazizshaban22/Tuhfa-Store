
'use client';
import React, { useState } from 'react';
import { connectWallet } from '../../lib/wallet';

export default function WalletPage(){
  const [addr,setAddr] = useState<string>('');
  const [sig,setSig] = useState<string>('');
  const [tx,setTx] = useState<string>('');
  async function onConnect(){ const a = await connectWallet(); setAddr(a||''); }
  async function onSign(){
    if(!addr) return alert('اتصل أولاً');
    const msg = `Tuhfa login @ ${new Date().toISOString()} - ${addr}`;
    const js = await fetch('/api/web3/mint',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ action:'sign', message: msg })}).then(r=>r.json());
    setSig(js.sig || '—');
  }
  async function onMint(){
    const body = { to: addr, uri: 'ipfs://metadata.json' };
    const js = await fetch('/api/web3/mint',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) }).then(r=>r.json());
    setTx(js.tx || js.error || '—');
  }
  return (
    <main style={{padding:24}} dir="rtl">
      <h2>المحفظة — Reown AppKit (Connect/Sign/Tx)</h2>
      <p>أدخل Project ID لاحقًا لتفعيل مودال Reown AppKit. الآن نستخدم مزود المتصفح (إن وجد) كحل مؤقت.</p>
      <button onClick={onConnect}>اتصال محفظة</button>
      <div style={{marginTop:8}}>العنوان: {addr || '—'}</div>
      <button onClick={onSign} disabled={!addr} style={{marginTop:12}}>توقيع</button>
      <div style={{wordBreak:'break-all'}}>{sig}</div>
      <button onClick={onMint} disabled={!addr} style={{marginTop:12}}>سكّ NFT (Mint)</button>
      <div style={{wordBreak:'break-all'}}>{tx}</div>
    </main>
  );
}
