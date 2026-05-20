'use client';
import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE as string;
      const ret = window.location.origin + '/thank-you';
      const res = await fetch(base + '/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('jwt') || '') },
        body: JSON.stringify({ items: [{ productId: 'REPLACE_ID', quantity: 1 }], provider: 'stripe', returnUrl: ret }),
      }).then(r => r.json());

      if (res?.orderId) localStorage.setItem('last_order_id', res.orderId);
      // try to append orderId to redirect url if present
      if (res?.payment?.url) {
        const url = new URL(res.payment.url);
        if (!url.searchParams.get('order') && res.orderId) url.searchParams.set('order', res.orderId);
        window.location.href = url.toString();
      } else if (res?.payment?.redirect_url) {
        // Tap redirect URL (may or may not support appending params safely)
        window.location.href = res.payment.redirect_url;
      }
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
    </main>
  );
}
