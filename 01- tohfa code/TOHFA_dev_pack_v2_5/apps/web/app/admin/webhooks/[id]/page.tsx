async function getEvent(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/webhooks/' + id, { cache: 'no-store' });
  return await res.json();
}

export default async function WebhookEventDetails({ params }: any) {
  const ev = await getEvent(params.id);
  if (!ev || ev.ok === false) {
    return <main className="container mx-auto p-6">لم يتم العثور على الحدث</main>;
  }
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Webhook Event</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Meta</h2>
          <table className="text-sm">
            <tbody>
              <Row k="ID" v={ev.id} />
              <Row k="Provider" v={ev.provider} />
              <Row k="Type" v={ev.type} />
              <Row k="Status" v={ev.status} />
              <Row k="DeliveryId" v={ev.deliveryId || '-'} />
              <Row k="OrderId" v={ev.orderId || '-'} />
              <Row k="Source IP" v={ev.sourceIp || '-'} />
              <Row k="Received" v={new Date(ev.receivedAt).toLocaleString()} />
              <Row k="Processed" v={ev.processedAt ? new Date(ev.processedAt).toLocaleString() : '-'} />
              <Row k="Attempts" v={String(ev.attemptCount)} />
              <Row k="Last Attempt" v={ev.lastAttemptAt ? new Date(ev.lastAttemptAt).toLocaleString() : '-'} />
            </tbody>
          </table>
        </div>
        <div className="border rounded p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Headers</h2>
          <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify(ev.headers || {}, null, 2)}</pre>
        </div>
      </div>
      <div className="border rounded p-4 mt-6 overflow-auto">
        <h2 className="font-semibold mb-2">Payload</h2>
        <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify(ev.payload || {}, null, 2)}</pre>
      </div>
    </main>
  );
}

function Row({ k, v }: { k: string, v: string }) {
  return (
    <tr>
      <td className="py-1 pr-4 opacity-70">{k}</td>
      <td className="py-1">{v}</td>
    </tr>
  );
}
