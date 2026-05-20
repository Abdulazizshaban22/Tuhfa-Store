export const dynamic = 'force-dynamic';
import Owner from './owner';
const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
export default async function Product({ params }:{ params:{ id:string }}){
  const r = await fetch(`${API}/products/${params.id}`, { cache: 'no-store' });
  const p = await r.json();
  return <main style={{padding:24}}>
    <a href="/products">← جميع المنتجات</a>
    <h1>{p.title}</h1>
    <img src={p.imageUrl} width={400}/>
    <p>{p.description}</p>
    <section>
      <h3>IIIF Manifest</h3>
      <pre>{JSON.stringify(await (await fetch(`${API}/iiif/manifest/product/${params.id}`)).json(), null, 2)}</pre>
    </section>
    <Owner externalId={params.id} apiBase={API}/>
  </main>
}
