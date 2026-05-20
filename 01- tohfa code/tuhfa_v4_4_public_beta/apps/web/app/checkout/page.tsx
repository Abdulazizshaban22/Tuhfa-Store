
'use client'
import React, {useState} from 'react';
export default function CheckoutPage(){
  const [provider, setProvider] = useState<'tap'|'hyperpay'>('tap');
  const [status, setStatus] = useState('idle');
  async function start(){
    setStatus('starting...');
    const res = await fetch(`/api/payments/${provider}/session`, {method:'POST'});
    const data = await res.json();
    setStatus(`started: ${JSON.stringify(data)}`);
  }
  return (
    <main style={{padding:24}}>
      <h1>Checkout — Apple Pay / mada</h1>
      <p>اختر مزود الدفع:</p>
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
