async function getDaily() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/admin/metrics/daily', { cache: 'no-store' });
  return await res.json();
}
async function getTotals() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/admin/metrics', { cache: 'no-store' });
  return await res.json();
}

export default async function AdminDashboardPage() {
  const [daily, totals] = await Promise.all([getDaily(), getTotals()]);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة الإدارة</h1>
      <div>طلبات مدفوعة: {totals?.orders?.paid ?? 0}</div>
      <div style={{marginTop:12}}>
        <a href="/admin/live" style={{textDecoration:'underline'}}>البث الحي للمؤشرات</a>
      </div>
      <pre style={{marginTop:16, padding:12, border:'1px solid #eee', borderRadius:8}}>{JSON.stringify(daily, null, 2)}</pre>
    </main>
  );
}
