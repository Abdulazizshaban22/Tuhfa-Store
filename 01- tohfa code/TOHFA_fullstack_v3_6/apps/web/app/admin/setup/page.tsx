
'use client';
export default function Setup(){
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
  const run = async ()=>{
    const r = await fetch(api + '/api/setup/init', { method:'POST' });
    alert(JSON.stringify(await r.json()));
  };
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>تهيئة قاعدة البيانات (pgvector)</h1>
      <button onClick={run} style={{padding:'8px 12px', background:'#000', color:'#fff'}}>إنشاء الجداول والامتداد</button>
      <p style={{opacity:.6, fontSize:12, marginTop:8}}>ستحتاج لتشغيل PostgreSQL بامتداد pgvector.</p>
    </main>
  );
}
