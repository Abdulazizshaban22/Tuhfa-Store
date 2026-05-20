export default async function ShopPage() {
  // In real app, fetch from API
  const products = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/products').then(r => r.json()).catch(() => []);
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">سوق تحفة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <a key={p.id} href={`/product/${p.id}`} className="border rounded p-4 hover:shadow">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="opacity-70">{(p.priceCents/100).toFixed(2)} SAR</div>
          </a>
        ))}
      </div>
    </main>
  );
}
