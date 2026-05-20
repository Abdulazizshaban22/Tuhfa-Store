export const dynamic = 'force-dynamic';
const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
export default async function Products(){
  const r = await fetch(`${API}/products`, { cache: 'no-store' });
  const data = await r.json();
  return <main style={{padding:24}}>
    <h2>المنتجات ({data.count})</h2>
    <ul style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}}>
      {data.data?.map((p:any)=> <li key={p.id} style={{border:'1px solid #eee',padding:12}}>
        <img src={p.imageUrl} alt="" width={200} height={200} style={{objectFit:'cover'}}/>
        <div style={{fontWeight:600}}>{p.title}</div>
        <a href={`/product/${p.externalId}`}>التفاصيل</a>
      </li>)}
    </ul>
  </main>
}
