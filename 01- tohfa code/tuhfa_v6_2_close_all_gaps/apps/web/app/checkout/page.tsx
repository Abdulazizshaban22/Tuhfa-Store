
'use client'
async function call(path:string, body:any={}){
  const r = await fetch(path,{ method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) })
  const j = await r.json()
  alert(JSON.stringify(j,null,2))
}
export default function Checkout(){
  return <main style={{padding:24}}>
    <h2>الدفع — Apple Pay / mada</h2>
    <p>اختر المزود لتجربة التهيئة (استبدل المفاتيح بـ .env):</p>
    <button onClick={()=>call('/api/payments/tap/session',{amount:'100.00',currency:'SAR'})}>Tap — تهيئة</button>
    <button style={{marginInlineStart:12}} onClick={()=>call('/api/payments/hyperpay/checkout',{amount:'100.00',currency:'SAR'})}>HyperPay — تهيئة</button>
  </main>
}
