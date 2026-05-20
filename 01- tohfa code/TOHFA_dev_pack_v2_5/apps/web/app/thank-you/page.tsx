'use client';
import { useEffect, useState } from 'react';

export default function ThankYou() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('loading');
  const [lang, setLang] = useState<'ar'|'en'>('ar');

  const t = (ar: string, en: string) => lang === 'ar' ? ar : en;

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
          if (['paid','failed','canceled'].includes(r.status)) clearInterval(timer);
        }
      } catch {}
    }
    poll();
    timer = setInterval(poll, 2500);
    return () => clearInterval(timer);
  }, []);

  const isDone = status === 'paid';
  const isFail = ['failed','canceled'].includes(status);

  return (
    <main className="container mx-auto p-10 text-center">
      <div className="flex justify-center mb-4">
        <button onClick={()=>setLang('ar')} className={`px-3 py-1 border rounded-l ${lang==='ar'?'bg-black text-white':''}`}>AR</button>
        <button onClick={()=>setLang('en')} className={`px-3 py-1 border rounded-r ${lang==='en'?'bg-black text-white':''}`}>EN</button>
      </div>

      <h1 className="text-2xl font-bold mb-2">{t('شكرًا لك','Thank you')}</h1>
      <p className="opacity-80 mb-6">{t('نتابع حالة طلبك آليًا.','We are tracking your order status automatically.')}</p>

      <div className="inline-flex items-center gap-3 px-4 py-2 border rounded mb-4">
        <span className="font-semibold">{t('الحالة:','Status:')}</span>
        <span className="uppercase">{status}</span>
      </div>

      {orderId && <p className="mt-1 text-sm">{t('رقم الطلب:','Order ID:')} {orderId}</p>}

      <div className="mt-8 h-20 flex items-center justify-center">
        {isDone && <div className="animate-bounce text-3xl">🎉</div>}
        {isFail && <div className="text-3xl">⚠️</div>}
        {!isDone && !isFail && <div className="animate-pulse text-xl">{t('جاري المعالجة…','Processing…')}</div>}
      </div>
    </main>
  );
}
