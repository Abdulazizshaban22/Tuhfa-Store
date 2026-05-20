
'use client';
import React, { useState } from 'react';
import { connectWallet } from '../../lib/wallet';

export default function WalletPage(){
  const [addr,setAddr] = useState<string>('');
  const [sig,setSig] = useState<string>('');
  async function onConnect(){ const a = await connectWallet(); setAddr(a||''); }
  async function onSign(){ if(!addr) return alert('اتصل أولاً'); const s = await fetch('/api/web3/config').then(r=>r.json()); const msg = `Tuhfa login @ ${new Date().toISOString()} - ${addr}`; const resp = await fetch('/api/web3/mint',{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ action:'sign', message: msg })}); const js = await resp.json(); setSig(js.sig || '—'); }
  return (
    <main style={{padding:24}} dir="rtl">
      <h2>المحفظة — Reown/WalletConnect (Placeholder)</h2>
      <p>هنا سيظهر مودال Reown AppKit فعليًا عند التفعيل.</p>
      <button onClick={onConnect}>اتصال محفظة</button>
      <div style={{marginTop:12}}>العنوان: {addr || '—'}</div>
      <button onClick={onSign} disabled={!addr} style={{marginTop:12}}>توقيع رسالة (Demo)</button>
      <div style={{wordBreak:'break-all'}}>{sig}</div>
    </main>
  );
}
