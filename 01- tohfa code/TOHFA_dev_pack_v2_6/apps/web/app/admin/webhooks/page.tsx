'use client';
import { useEffect, useState } from 'react';

export default function AdminWebhooksPage() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState({ provider: '', status: '', type: '', qtext: '', from: '', to: '' });

  async function load() {
    const usp = new URLSearchParams();
    Object.entries(q).forEach(([k,v]) => { if (v) usp.set(k, v as string); });
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/admin/webhooks?` + usp.toString();
    const res = await fetch(url, { cache: 'no-store' }).then(r => r.json()).catch(()=>[]);
    setItems(Array.isArray(res) ? res : []);
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Webhook Events</h1>
        <a href={`${process.env.NEXT_PUBLIC_API_BASE}/admin/reports/sales.pdf`} target="_blank" className="px-3 py-2 border rounded hover:bg-gray-50">📄 Sales PDF</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
        <select className="border rounded p-2" value={q.provider} onChange={e=>setQ({...q, provider:e.target.value})}>
          <option value="">All providers</option>
          <option value="stripe">stripe</option>
          <option value="tap">tap</option>
        </select>
        <select className="border rounded p-2" value={q.status} onChange={e=>setQ({...q, status:e.target.value})}>
          <option value="">All status</option>
          <option value="received">received</option>
          <option value="processing">processing</option>
          <option value="processed">processed</option>
          <option value="failed">failed</option>
        </select>
        <input className="border rounded p-2" placeholder="type contains" value={q.type} onChange={e=>setQ({...q, type:e.target.value})} />
        <input className="border rounded p-2" placeholder="text search" value={q.qtext} onChange={e=>setQ({...q, qtext:e.target.value})} />
        <input className="border rounded p-2" type="date" value={q.from} onChange={e=>setQ({...q, from:e.target.value})} />
        <input className="border rounded p-2" type="date" value={q.to} onChange={e=>setQ({...q, to:e.target.value})} />
        <button className="border rounded p-2" onClick={load}>Search</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Attempts</th>
              <th className="py-2 pr-4">DeliveryId</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ev:any)=>(
              <tr key={ev.id} className="border-t">
                <td className="py-2 pr-4">{new Date(ev.receivedAt).toLocaleString()}</td>
                <td className="py-2 pr-4">{ev.provider}</td>
                <td className="py-2 pr-4"><a className="underline" href={`/admin/webhooks/${ev.id}`}>{ev.type}</a></td>
                <td className="py-2 pr-4">{ev.status}</td>
                <td className="py-2 pr-4">{ev.attemptCount}</td>
                <td className="py-2 pr-4">{ev.deliveryId || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
