async function fetchArtisan(handle: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${base}/artisans/handle/${handle}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('فشل جلب بيانات الحرفي');
  return res.json();
}

export default async function ArtisanPage({ params }: { params: { handle: string } }) {
  const artisan = await fetchArtisan(params.handle);
  return (
    <div>
      <a href="/">← الرئيسية</a>
      <h1 style={{marginTop:12}}>{artisan.nameAr}</h1>
      <div style={{color:'#666'}}>المتجر: {artisan.storeHandle}</div>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem'}}>
        {artisan.products?.map((p:any)=>(
          <a key={p.externalId} href={`/product/${p.externalId}`} style={{border:'1px solid #eee', borderRadius:8, padding:12, textDecoration:'none'}}>
            <div style={{fontSize:14, color:'#666'}}>{p.craftType?.nameAr}</div>
            <div style={{fontWeight:700}}>{p.titleAr}</div>
            <div style={{marginTop:8}}>{p.priceSar} ر.س</div>
          </a>
        ))}
      </div>
    </div>
  );
}
