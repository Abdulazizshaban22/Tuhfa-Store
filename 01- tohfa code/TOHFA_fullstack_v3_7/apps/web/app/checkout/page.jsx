'use client'
import { useState } from 'react'
const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function Checkout(){
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

  async function pay(method='card'){
    setLoading(true);
    const r = await fetch(`${API}/api/payments/create`, {
      method:'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ amount: 5000, currency: 'SAR', orderId: 'ORDER-123', method })
    });
    const j = await r.json(); setResp(j); setLoading(false);
  }

  return (
    <div>
      <h2>الدفع</h2>
      <button onClick={()=>pay('card')} disabled={loading}>الدفع بالبطاقة/مدى</button>
      <button onClick={()=>pay('applepay')} disabled={loading}>Apple Pay (Tap)</button>
      <pre style={{whiteSpace:'pre-wrap', background:'#111', padding:12, marginTop:12}}>{resp? JSON.stringify(resp,null,2):'—'}</pre>
    </div>
  );
}