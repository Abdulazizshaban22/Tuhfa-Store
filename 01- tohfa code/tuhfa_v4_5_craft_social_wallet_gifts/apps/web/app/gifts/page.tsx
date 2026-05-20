
'use client'
import React, {useEffect, useState} from 'react';
type Gift = { id:number; title:string; price:number; image?:string };
export default function Gifts(){
  const [items, setItems] = useState<Gift[]>([]);
  const [bundle, setBundle] = useState<number[]>([]);
  useEffect(()=>{ fetch('/api/gifts/catalog').then(r=>r.json()).then(setItems); }, []);
  function toggle(id:number){
    setBundle(b=> b.includes(id) ? b.filter(x=>x!==id) : [...b,id]);
  }
  async function checkout(){
    const res = await fetch('/api/gifts/bundle',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items:bundle})});
    const data = await res.json();
    alert('تم إنشاء الحزمة والشهادة: '+JSON.stringify(data));
  }
  return (
    <main style={{padding:24}}>
      <h1>Corporate Gifts Hub — هدايا مؤسسية</h1>
      <p>اختر مجموعة من القطع لإنشاء حزمة هدايا موقّعة (NFC/XMP).</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {items.map(i=>(
          <div key={i.id} style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
            {i.image && <img src={i.image} style={{width:'100%',borderRadius:6}}/>}
            <h3>{i.title}</h3>
            <div>SAR {i.price}</div>
            <button onClick={()=>toggle(i.id)}>{bundle.includes(i.id) ? 'إزالة' : 'إضافة إلى الحزمة'}</button>
          </div>
        ))}
      </div>
      <div style={{height:12}}/>
      <button onClick={checkout} disabled={!bundle.length}>إتمام حزمة الهدايا</button>
    </main>
  );
}
