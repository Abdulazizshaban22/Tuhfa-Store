import React, { useState } from 'react';

export default function Checkout(){
  const [provider, setProvider] = useState<'tap'|'hyperpay'>('tap');
  const [method, setMethod]     = useState<'applepay'|'card'>('applepay');
  const [amount, setAmount]     = useState(50);
  const [loading, setLoading]   = useState(false);
  const [resp, setResp]         = useState<any>(null);

  async function create(){
    setLoading(true);
    const body:any = { amount };
    if(provider==='tap') body.method = method;
    const r = await fetch(`/api/payments/${provider}/create`, {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
    const j = await r.json();
    setResp(j);
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="card">
        <label>مزود الدفع</label>
        <select value={provider} onChange={e=>setProvider(e.target.value as any)}>
          <option value="tap">Tap</option>
          <option value="hyperpay">HyperPay</option>
        </select>

        {provider==='tap' && <>
          <label>طريقة Tap</label>
          <select value={method} onChange={e=>setMethod(e.target.value as any)}>
            <option value="applepay">Apple Pay / Mada (via Tap)</option>
            <option value="card">Card / طرق أخرى</option>
          </select>
        </>}

        <label>المبلغ (SAR)</label>
        <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0',10))}/>

        <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
          <button className="btn" onClick={create} disabled={loading}>{loading? 'يرجى الانتظار...' : 'إنشاء عملية'}</button>
          {resp?.redirect_url && <a className="btn" href={resp.redirect_url}>الانتقال للدفع</a>}
        </div>
      </div>

      {resp && <div className="card">
        <h3>نتيجة الطلب</h3>
        <pre>{JSON.stringify(resp, null, 2)}</pre>
      </div>}
    </div>
  )
}
