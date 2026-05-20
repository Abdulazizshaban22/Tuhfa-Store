async function getMetrics() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/metrics', { cache: 'no-store' });
  return await res.json();
}

export default async function AdminDashboardPage() {
  const m = await getMetrics();
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة المراقبة</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="طلبات مدفوعة" value={m?.orders?.paid ?? 0} />
        <Card title="طلبات قيد المعالجة" value={m?.orders?.pending ?? 0} />
        <Card title="طلبات فاشلة" value={m?.orders?.failed ?? 0} />
        <Card title="Webhook — Received" value={m?.webhooks?.received ?? 0} />
        <Card title="Webhook — Processed" value={m?.webhooks?.processed ?? 0} />
        <Card title="Webhook — Failed" value={m?.webhooks?.failed ?? 0} />
      </div>
      <p className="opacity-70 mt-6 text-sm">آخر تحديث: {m?.ts}</p>
    </main>
  );
}

function Card({ title, value }: { title: string, value: number }) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm opacity-70 mb-2">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
