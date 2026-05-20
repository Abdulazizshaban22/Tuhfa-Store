
export default async function Home(){
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
  const res = await fetch(api + '/api/products', { cache:'no-store' });
  const data = await res.json();
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:22,fontWeight:700}}>تحفة — المنصّة الحرفية</h1>
      <p style={{opacity:.7}}>لوحة الإدارة، NFC، محافظ Web3، ومشهد 3D.</p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:12}}>
        <a href="/admin/wallets/connect">المحافظ</a>
        <a href="/admin/web3/nfc-write">NFC Write</a>
        <a href="/certificate/view">الشهادة</a>
        <a href="/museum/immersive">المتحف 3D</a>
      </div>
      <h2 style={{marginTop:16}}>منتجات</h2>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12}}>{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}
