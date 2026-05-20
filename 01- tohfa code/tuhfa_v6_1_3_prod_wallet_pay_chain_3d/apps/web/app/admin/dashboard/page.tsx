
'use client';
import React, { useEffect, useState } from 'react';
export default function Dashboard(){
  const [ov,setOv]=useState<any>(null);
  useEffect(()=>{ fetch(process.env.NEXT_PUBLIC_METRICS_URL || 'http://localhost:7080/metrics/overview').then(r=>r.json()).then(setOv)},[]);
  return (
    <main style={{padding:24}} dir="rtl">
      <h2>لوحة القيادة — بيانات حية</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(0,1fr))',gap:16}}>
        <Box title="عدد القطع">{ov? ov.assets.count : '...'}</Box>
        <Box title="عدد المبيعات">{ov? ov.sales.count : '...'}</Box>
        <Box title="إجمالي الإيراد (SAR)">{ov? ov.sales.revenue : '...'}</Box>
      </div>
    </main>
  );
}
function Box({title, children}:{title:string;children:any}){
  return <section style={{border:'1px solid #eee',borderRadius:12,padding:16}}>
    <h3 style={{marginTop:0}}>{title}</h3>
    <div style={{fontSize:24,fontWeight:700}}>{children}</div>
  </section>;
}
