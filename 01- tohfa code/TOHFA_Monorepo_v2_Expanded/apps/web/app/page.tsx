async function fetchProducts() {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${base}/products?take=24`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
export default async function Home() {
  const products = await fetchProducts();
  return (
    <div>
      <h1>تحف مختارة</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'1rem'}}>
        {products.map((p:any)=>(
          <a key={p.externalId} href={`/product/${p.externalId}`} style={{border:'1px solid #eee',borderRadius:8,padding:12,textDecoration:'none'}}>
            <div style={{fontSize:14,color:'#666'}}>{p.craftType?.nameAr}</div>
            <div style={{fontWeight:700}}>{p.titleAr}</div>
            <div style={{marginTop:8}}>{p.priceSar} ر.س</div>
            <div style={{fontSize:12,color:'#888'}}>{p.artisan?.nameAr}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
