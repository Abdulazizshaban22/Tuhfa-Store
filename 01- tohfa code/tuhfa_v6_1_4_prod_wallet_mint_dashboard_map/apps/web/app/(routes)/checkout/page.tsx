'use client'
async function createTapSession(){
  const res = await fetch('/api/payments/tap/session',{method:'POST'})
  const data = await res.json()
  alert('Tap init: ' + JSON.stringify(data))
}
async function createHyperpayCheckout(){
  const res = await fetch('/api/payments/hyperpay/checkout',{method:'POST'})
  const data = await res.json()
  alert('HyperPay init: ' + JSON.stringify(data))
}
export default function Checkout(){
  return (
    <main style={{padding:24}}>
      <h1>الدفع</h1>
      <button onClick={createTapSession}>تهيئة Tap (Apple Pay / mada)</button>
      <button onClick={createHyperpayCheckout} style={{marginInlineStart:12}}>تهيئة HyperPay</button>
      <p>تأكد من إعداد مفاتيح .env كما في المثال.</p>
    </main>
  )
}
