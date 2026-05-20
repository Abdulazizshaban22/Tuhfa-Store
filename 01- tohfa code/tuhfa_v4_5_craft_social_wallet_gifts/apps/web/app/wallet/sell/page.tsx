
'use client'
import React, {useState} from 'react';
export default function SellPage({searchParams}:{searchParams:{tokenId?:string}}){
  const [price, setPrice] = useState(500);
  async function submit(){
    const res = await fetch('/api/wallet/listing',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({tokenId:searchParams.tokenId, price})});
    const data = await res.json();
    alert('تم إنشاء العرض: '+JSON.stringify(data));
  }
  return (
    <main style={{padding:24}}>
      <h1>إدراج مقتنى لإعادة البيع</h1>
      <p>Token ID: {searchParams.tokenId}</p>
      <label>السعر (SAR): <input type="number" value={price} onChange={e=>setPrice(parseInt(e.target.value))}/></label>
      <div style={{height:8}}/>
      <button onClick={submit}>إنشاء العرض</button>
      <p style={{marginTop:16, color:'#666'}}>يمكن ربط هذا التدفق بعقد ERC-721 يدعم EIP-2981 للرويالتي، أو ترك المعاملة بالريال عبر Tap.</p>
    </main>
  );
}
