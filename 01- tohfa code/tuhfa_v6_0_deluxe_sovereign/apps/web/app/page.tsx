
export default function Home() {
  return (
    <main style={padding:24} dir="rtl">
      <h1>تحفة v6.0 — Deluxe Sovereign</h1>
      <p>نسخة الترف التقني السيادي — المتاحف الثلاثية + ذكاء ثقافي + Wallet + Provenance + Dashboard.</p>
      <ul>
        <li><a href="/gallery/3d">معرض 3D (تجريبي)</a></li>
        <li><a href="/admin/dashboard">لوحة القيادة</a></li>
        <li><a href="/api/oai?verb=Identify">OAI-PMH Identify</a></li>
        <li><a href="/api/preservation/mets?assetId=1">METS</a> · <a href="/api/preservation/premis?assetId=1">PREMIS</a> · <a href="/api/preservation/bagit?assetId=1">BagIt</a></li>
        <li><a href="/api/provenance/cert?id=TUHFA-0001">شهادة أصالة (QR/JSON-LD)</a></li>
      </ul>
    </main>
  );
}
