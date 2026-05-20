
'use client'
import React, {useState} from 'react';
export default function CheckoutPage(){
  const [provider, setProvider] = useState<'tap'|'hyperpay'>('tap');
  const [status, setStatus] = useState('idle');
  const [amount, setAmount] = useState(100);
  async function start(){
    setStatus('starting...');
    const res = await fetch(`/api/payments/${provider}/session`, {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({amount, currency: 'SAR', desc: 'Tuhfa Test Item'})});
    const data = await res.json();
    setStatus(`started: ${JSON.stringify(data)}`);
  }
  return (
    <main style={{padding:24}}>
      <h1>Checkout — Apple Pay / mada</h1>
      <label>Amount (SAR): <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value))}/></label>
      <div style={{height:8}}/>
      <label>Provider: </label>
      <select onChange={(e)=>setProvider(e.target.value as any)} value={provider}>
        <option value="tap">Tap</option>
        <option value="hyperpay">HyperPay</option>
      </select>
      <div style={{height:12}}/>
      <button onClick={start}>Start Payment</button>
      <div style={{height:16}}/>
      <pre>{status}</pre>
      <p style={{marginTop:24}}>
        ملاحظة: تفعيل Apple Pay على الويب يتطلب التحقق من الدومين واستضافة ملف
        <code>/.well-known/apple-developer-merchantid-domain-association</code>.
      </p>
    </main>
  );
}
