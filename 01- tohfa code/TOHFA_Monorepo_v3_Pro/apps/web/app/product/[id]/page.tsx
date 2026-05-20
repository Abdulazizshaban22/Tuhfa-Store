import Script from 'next/script'
async function fetchProduct(id:string){
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const r = await fetch(`${base}/products/${id}`, { cache:'no-store' }); if(!r.ok) throw new Error('fail'); return r.json();
}
async function fetchRecs(id:string){
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const r = await fetch(`${base}/products/${id}/recommendations`, { next:{ revalidate: 120 } }); if(!r.ok) return []; return r.json();
}
export default async function Product({ params }:{ params:{ id:string } }){
  const data = await fetchProduct(params.id); const recs = await fetchRecs(params.id);
  const usdz = data?.arUsdz || '/3d/placeholder.usdz';
  const gltf = data?.arGltf || '/3d/placeholder.glb';
  return (<div>
    <a href="/">← الرئيسية</a>
    <h1 style={{marginTop:12}}>{data.titleAr}</h1>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div>
        <a rel="ar" href={usdz}><img src="/ar-badge.svg" alt="View in AR" style={{height:40}}/></a>
        <model-viewer src={gltf} ar ar-modes="webxr scene-viewer quick-look" camera-controls style={{width:'100%',height:380,background:'#f8f8f8'}}></model-viewer>
      </div>
      <div>
        <div style={{color:'#666'}}>{data.craftType?.nameAr}</div>
        <div style={{margin:'12px 0', fontWeight:700}}>{data.priceSar} ر.س</div>
        <div>الحرفي: {data.artisan?.nameAr ?? '—'}</div>
      </div>
    </div>
    <h3 style={{marginTop:24}}>تحف مشابهة</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
      {recs?.map((p:any)=>(<a key={p.externalId} href={`/product/${p.externalId}`} style={{border:'1px solid #eee',padding:12,borderRadius:8,textDecoration:'none'}}>
        <div style={{fontSize:12,color:'#777'}}>{p.craftTypeCode}</div>
        <div style={{fontWeight:700}}>{p.titleAr}</div>
        <div style={{marginTop:8}}>{p.priceSar} ر.س</div>
      </a>))}
    </div>
    <Script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" type="module" />
  </div>)
}
