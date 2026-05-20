'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ city: '', street: '', building: '', zip: '' });
  const [amount, setAmount] = useState(250);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
    const res = await fetch(`${base}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSar: amount, address: { name, ...address } }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{maxWidth: 560}}>
      <a href="/">← الرئيسية</a>
      <h1>الدفع</h1>
      <label>الاسم
        <input value={name} onChange={e=>setName(e.target.value)} style={{display:'block',width:'100%'}} />
      </label>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
        <label>المدينة<input value={address.city} onChange={e=>setAddress({...address, city: e.target.value})} /></label>
        <label>الحي/الشارع<input value={address.street} onChange={e=>setAddress({...address, street: e.target.value})} /></label>
        <label>المبنى<input value={address.building} onChange={e=>setAddress({...address, building: e.target.value})} /></label>
        <label>الرمز البريدي<input value={address.zip} onChange={e=>setAddress({...address, zip: e.target.value})} /></label>
      </div>
      <label style={{display:'block', marginTop:8}}>المبلغ (ر.س)
        <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0',10))} />
      </label>
      <button onClick={submit} disabled={loading} style={{marginTop:12}}>
        {loading ? 'جارٍ...' : 'إنشاء جلسة دفع'}
      </button>

      {result && (
        <pre style={{marginTop:16, background:'#f7f7f7', padding:12, overflow:'auto'}}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
