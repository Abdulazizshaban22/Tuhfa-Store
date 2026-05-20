async function getProducts() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/orders', { cache: 'no-store' });
  return [];
}
export default async function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">تحفة — السوق الحرفي</h1>
      <p className="opacity-70">منصة للحرفيين والمتاحف — متجر ومعرض وذكاء.</p>
      <a href="/admin/dashboard" style={{display:'inline-block',marginTop:16,textDecoration:'underline'}}>لوحة الإدارة</a>
    </main>
  );
}
