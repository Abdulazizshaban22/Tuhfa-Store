'use client'
import { useState } from 'react'
type Method = 'hosted'|'mada'|'apple'
export default function Checkout(){
  const [name,setName] = useState(''); const [address,setAddress] = useState({city:'',street:'',building:'',zip:''}); const [amount,setAmount] = useState(250)
  const [method,setMethod] = useState<Method>('hosted'); const [res,setRes] = useState<any>(null); const [loading,setLoading] = useState(false)
  async function submit(){ setLoading(true); setRes(null);
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
    const r = await fetch(`${base}/payments/checkout?method=${method}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amountSar: amount, address: { name, ...address }, customer: { first_name: name || 'Guest' } }) }); const d = await r.json(); setRes(d); setLoading(false); if(d?.transactionUrl) window.location.href = d.transactionUrl;
  }
  return (<div style={{maxWidth:560}}>
    <a href="/">← الرئيسية</a><h1>الدفع</h1>
    <label>الاسم<input value={name} onChange={e=>setName(e.target.value)} /></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
      <label>المدينة<input value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} /></label>
      <label>الشارع<input value={address.street} onChange={e=>setAddress({...address,street:e.target.value})} /></label>
      <label>المبنى<input value={address.building} onChange={e=>setAddress({...address,building:e.target.value})} /></label>
      <label>الرمز البريدي<input value={address.zip} onChange={e=>setAddress({...address,zip:e.target.value})} /></label>
    </div>
    <label>المبلغ<input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0',10))} /></label>
    <div><b>طريقة الدفع</b>
      <label><input type="radio" checked={method==='hosted'} onChange={()=>setMethod('hosted')} /> Tap Hosted</label>
      <label><input type="radio" checked={method==='mada'} onChange={()=>setMethod('mada')} /> mada</label>
      <label><input type="radio" checked={method==='apple'} onChange={()=>setMethod('apple')} /> Apple Pay</label>
    </div>
    <button onClick={submit} disabled={loading}>{loading?'جارٍ...':'ادفع الآن'}</button>
    {res && (<pre style={{marginTop:12,background:'#f7f7f7',padding:12,overflow:'auto'}}>{JSON.stringify(res,null,2)}</pre>)}
  </div>)
}
