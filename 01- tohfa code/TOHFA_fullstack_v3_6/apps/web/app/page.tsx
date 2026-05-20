
export default async function Home(){
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
  const res = await fetch(api + '/api/products', { cache:'no-store' });
  const data = await res.json();
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:22,fontWeight:700}}>تحفة — سوق الحِرف والمتاحف</h1>
      <p style={{opacity:.7}}>بحث دلالي (pgvector)، NFC/Web3، وامتثال PDPL.</p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:12}}>
        <a href="/search">بحث مشابه</a>
        <a href="/admin/setup">تهيئة قاعدة البيانات</a>
      </div>
      <h2 style={{marginTop:16}}>منتجات</h2>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12}}>{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}
