'use client';
import { useEffect, useState } from 'react';
import SimilarSkeleton from './SimilarSkeleton';

export default function SimilarGrid({ id, lang = 'ar' }: { id: string, lang?: 'ar'|'en' }) {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    async function run() {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}/embed`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}/similar?limit=6`).then(r => r.json());
        setItems(res.items || []);
      } catch {
        setItems([]);
      }
    }
    run();
  }, [id]);

  if (items === null) return <SimilarSkeleton />;
  if (!items.length) return null;

  const t = (a:string,e:string)=> lang==='ar'?a:e;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">{t('قطع مشابهة','Similar pieces')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p:any) => (
          <a key={p.id} href={`/product/${p.id}`} className="border rounded p-4 hover:shadow transition">
            <div className="text-sm opacity-70 mb-1">{(p.similarity*100).toFixed(0)}% {t('تشابه','match')}</div>
            <div className="font-medium">{p.name}</div>
            <div className="opacity-70 text-sm">{(p.priceCents/100).toFixed(2)} SAR</div>
          </a>
        ))}
      </div>
    </div>
  );
}
