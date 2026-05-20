
'use client';
import { useState } from 'react';

export default function Search(){
  const [q,setQ] = useState('');
  const [out,setOut] = useState<any>(null);
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
  const go = async ()=>{
    const r = await fetch(api + '/api/search-similar?q=' + encodeURIComponent(q));
    setOut(await r.json());
  };
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>بحث "قطع مشابهة"</h1>
      <input placeholder="اكتب وصف القطعة..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:6, width:'100%', maxWidth:520}}/>
      <button onClick={go} style={{padding:'8px 12px', marginInlineStart:8}}>بحث</button>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12, marginTop:12}}>{JSON.stringify(out,null,2)}</pre>
    </main>
  );
}
