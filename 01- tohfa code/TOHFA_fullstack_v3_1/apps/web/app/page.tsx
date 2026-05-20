export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">تحفة — السوق الحرفي</h1>
      <p className="opacity-70">منصة للحرفيين والمتاحف — متجر ومعرض وذكاء.</p>
      <div style={{marginTop:12, display:'flex', gap:16, flexWrap:'wrap'}}>
        <a href="/admin/dashboard" style={{textDecoration:'underline'}}>لوحة الإدارة</a>
        <a href="/admin/web3/mint-station" style={{textDecoration:'underline'}}>Mint Station</a>
        <a href="/admin/pdpl/requests" style={{textDecoration:'underline'}}>PDPL Requests</a>
        <a href="/museum/immersive" style={{textDecoration:'underline'}}>معرض ثلاثي الأبعاد</a>
      </div>
    </main>
  );
}
