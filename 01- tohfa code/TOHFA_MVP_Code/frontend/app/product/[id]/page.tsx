interface Product {
  externalId: string;
  titleAr: string;
  priceSar: number;
  status: string;
  craftType?: { nameAr: string };
  artisan?: { nameAr: string; storeHandle: string };
  passport?: { qrText: string };
}

async function fetchProduct(id: string): Promise<Product> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${base}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await fetchProduct(params.id);
  return (
    <div>
      <a href="/">← الرئيسية</a>
      <h1 style={{marginTop:12}}>{data.titleAr}</h1>
      <div style={{color:'#666'}}>{data.craftType?.nameAr}</div>
      <div style={{margin:'12px 0', fontWeight:700}}>{data.priceSar} ر.س</div>
      <div>الحرفي: {data.artisan?.nameAr ?? '—'}</div>
      <div style={{marginTop:12, fontSize:12, color:'#777'}}>جواز التحفة: {data.passport?.qrText ?? '—'}</div>
    </div>
  );
}
