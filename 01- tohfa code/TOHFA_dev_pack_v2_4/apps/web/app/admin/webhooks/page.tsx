async function getEvents() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/webhooks', { cache: 'no-store' });
  return await res.json();
}

export default async function AdminWebhooksPage() {
  const data = await getEvents();
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Webhook Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-4">وقت الاستلام</th>
              <th className="py-2 pr-4">المزوّد</th>
              <th className="py-2 pr-4">النوع</th>
              <th className="py-2 pr-4">الحالة</th>
              <th className="py-2 pr-4">محاولات</th>
              <th className="py-2 pr-4">DeliveryId</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((ev:any) => (
              <tr key={ev.id} className="border-t">
                <td className="py-2 pr-4">{new Date(ev.receivedAt).toLocaleString()}</td>
                <td className="py-2 pr-4">{ev.provider}</td>
                <td className="py-2 pr-4">{ev.type}</td>
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
