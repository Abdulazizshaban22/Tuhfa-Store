
'use client';
import React, { useState } from 'react';
export default function Checkout(){
  const [prov,setProv]=useState<'tap'|'hyperpay'|''>('');
  async function createSession(){
    const path = prov==='tap'? '/api/payments/tap/session' : '/api/payments/hyperpay/checkout';
    const js = await fetch(path, { method:'POST' }).then(r=>r.json());
    alert(JSON.stringify(js,null,2));
  }
  return (
    <main dir="rtl" style={{padding:24, maxWidth:720}}>
      <h2>الدفع — Apple Pay / mada</h2>
      <p>اختر المزود لبدء جلسة دفع:</p>
      <label><input type="radio" name="p" onChange={()=>setProv('tap')} /> Tap</label>
      <label style={{marginInlineStart:16}}><input type="radio" name="p" onChange={()=>setProv('hyperpay')} /> HyperPay</label>
      <div style={{marginTop:12}}>
        <button onClick={createSession} disabled={!prov}>ابدأ الدفع</button>
      </div>
    </main>
  );
}
