
async function getData(){
  const res = await fetch('http://localhost:3000/api/analytics', { cache: 'no-store' });
  return res.json();
}
export default async function Analytics(){
  const data = await getData();
  return (
    <main style={{padding:24}}>
      <h1>Cultural Analytics (Demo)</h1>
      <p>مؤشرات ثقافية ومبيعات — بيانات توضيحية.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
