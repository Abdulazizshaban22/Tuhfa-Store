
export default async function CertView({ searchParams }:{searchParams:any}){
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
  const qs = new URLSearchParams(searchParams).toString();
  const res = await fetch(api + '/api/certificate?' + qs, { cache:'no-store' });
  const data = await res.json();
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>شهادة المصادقة — Certificate</h1>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12}}>{JSON.stringify(data,null,2)}</pre>
      <a href="/" style={{textDecoration:'underline'}}>الرئيسية</a>
    </main>
  );
}
