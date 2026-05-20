'use client';
import { useEffect, useState } from 'react';

export default function SimilarGrid({ id }: { id: string }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    async function run() {
      // ensure embedding exists, then fetch similar
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}/embed`).catch(()=>{});
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}/similar?limit=6`).then(r => r.json()).catch(()=>({items:[]}));
      setItems(res.items || []);
    }
    run();
  }, [id]);

  if (!items.length) return null;
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">قطع مشابهة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p:any) => (
          <a key={p.id} href={`/product/${p.id}`} className="border rounded p-4 hover:shadow transition">
            <div className="text-sm opacity-70 mb-1">{(p.similarity*100).toFixed(0)}% تشابه</div>
            <div className="font-medium">{p.name}</div>
            <div className="opacity-70 text-sm">{(p.priceCents/100).toFixed(2)} SAR</div>
          </a>
        ))}
      </div>
    </div>
  );
}
