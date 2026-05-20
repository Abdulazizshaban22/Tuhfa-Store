'use client';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('loading');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qOrder = params.get('order');
    const local = localStorage.getItem('last_order_id');
    const id = qOrder || local;
    if (id) setOrderId(id);

    let timer: any;
    async function poll() {
      if (!id) return;
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/orders/${id}`).then(r => r.json());
        if (r?.ok) {
          setStatus(r.status);
          if (r.status === 'paid' || r.status === 'failed' || r.status === 'canceled') {
            clearInterval(timer);
          }
        }
      } catch {}
    }
    poll();
    timer = setInterval(poll, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container mx-auto p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">شكرًا لك</h1>
      <p className="opacity-80 mb-6">نتابع حالة طلبك آليًا.</p>
      <div className="inline-flex items-center gap-3 px-4 py-2 border rounded">
        <span className="font-semibold">الحالة:</span>
        <span className="uppercase">{status}</span>
      </div>
      {orderId && <p className="mt-3 text-sm">رقم الطلب: {orderId}</p>}
    </main>
  );
}
