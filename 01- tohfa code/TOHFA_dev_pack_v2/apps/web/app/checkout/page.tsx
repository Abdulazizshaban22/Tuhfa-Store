'use client';
import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  async function pay() {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('jwt') || '') },
        body: JSON.stringify({ items: [{ productId: 'REPLACE_ID', quantity: 1 }], provider: 'stripe', returnUrl: window.location.origin + '/thank-you' }),
      }).then(r => r.json());
      setUrl(res?.payment?.url || res?.payment?.redirect_url || null);
      if (res?.payment?.url) window.location.href = res.payment.url;
      else if (res?.payment?.redirect_url) window.location.href = res.payment.redirect_url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">الدفع</h1>
      <button onClick={pay} className="px-4 py-2 bg-emerald-600 text-white rounded" disabled={loading}>
        {loading ? '...جارٍ' : 'ادفع الآن'}
      </button>
      {url && <p className="mt-3 text-sm break-all">تم إنشاء رابط الدفع: {url}</p>}
    </main>
  );
}
