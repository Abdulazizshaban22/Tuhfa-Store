// apps/web/app/admin/dashboard/page.tsx
import LineMini from '../../components/charts/LineMini';

async function getDaily() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/metrics/daily', { cache: 'no-store' });
  return await res.json();
}
async function getTotals() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/metrics', { cache: 'no-store' });
  return await res.json();
}
async function getWindows() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/metrics/windows', { cache: 'no-store' });
  return await res.json();
}

export default async function AdminDashboardPage() {
  const [daily, totals, windows] = await Promise.all([getDaily(), getTotals(), getWindows()]);
  const labels = (daily?.items || []).map((r:any)=> new Date(r.day).toLocaleDateString());
  const paid = (daily?.items || []).map((r:any)=> Number(r.paid||0));
  const whFailed = (daily?.items || []).map((r:any)=> Number(r.webhooks_failed||0));

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة المراقبة</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="مدفوع (5m)" value={windows?.orders?.paid_5m ?? 0} />
        <Card title="مدفوع (1h)" value={windows?.orders?.paid_1h ?? 0} />
        <Card title="مدفوع (24h)" value={windows?.orders?.paid_24h ?? 0} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card title="Webhook فاشلة (5m)" value={windows?.webhooks?.failed_5m ?? 0} />
        <Card title="Webhook فاشلة (1h)" value={windows?.webhooks?.failed_1h ?? 0} />
        <Card title="Webhook فاشلة (24h)" value={windows?.webhooks?.failed_24h ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-3">المبيعات — 14 يوم</h2>
          <LineMini labels={labels} seriesA={paid} labelA="Paid Orders" />
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-3">ويبهوك فاشلة — 14 يوم</h2>
          <LineMini labels={labels} seriesA={whFailed} labelA="Failed Webhooks" />
        </div>
      </div>
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
