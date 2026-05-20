import { useState } from 'react';

const MOCK = {
  id: 1,
  sku: 'TUHFA-0001',
  title: 'مزهرية سدو نجدي — إصدار محدود',
  description: 'قطعة حرفية موثقة — يمكن ربطها بوسم NFC وسكّ NFT للملكية الرقمية.',
  price_sar: 450,
  image_url: 'https://images.unsplash.com/photo-1549887534-1541e9323e74?q=80&w=1200&auto=format&fit=crop'
};

export default function Product(){
  const [provider, setProvider] = useState<'tap'|'hyperpay'>('tap');
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState<string|undefined>();

  async function buy(){
    setLoading(true);
    const r = await fetch(`/api/payments/${provider}/create`, {
      method: 'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify({ amount: MOCK.price_sar })
    });
    const j = await r.json();
    setLoading(false);
    if(j.redirect_url){ window.location.href = j.redirect_url; }
    else if(j.checkoutId){ alert('HyperPay checkoutId: '+j.checkoutId); }
    else { alert('لم يتم إنشاء عملية الدفع'); }
  }

  async function mint(){
    const to = (window as any).selectedAddress || undefined;
    const tokenURI = '/api/metadata/'+MOCK.sku; // TODO: serve dynamic metadata
    const r = await fetch('/api/nft/mint', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ to, tokenURI }) });
    const j = await r.json();
    if(j.hash){ setHash(j.hash); alert('تم إرسال معاملة السك: ' + j.hash); }
    else { alert('فشل السك: ' + (j.error||'unknown')); }
  }

  return (
    <div className="container">
      <h1>{MOCK.title}</h1>
      <div className="grid">
        <img src={MOCK.image_url} style={{width:'100%',borderRadius:12}} alt="product"/>
        <div className="card">
          <p>{MOCK.description}</p>
          <p><b>{MOCK.price_sar} SAR</b></p>
          <label>مزود الدفع</label>
          <select value={provider} onChange={e=>setProvider(e.target.value as any)}>
            <option value="tap">Tap (Apple Pay/Mada)</option>
            <option value="hyperpay">HyperPay</option>
          </select>
          <div style={{marginTop:12, display:'flex', gap:8}}>
            <button className="btn" onClick={buy} disabled={loading}>{loading? 'قيد المعالجة...' : 'شراء الآن'}</button>
            <button className="btn" onClick={mint}>امتلك كـ NFT (Scan-to-Own)</button>
          </div>
          {hash && <small>Tx: {hash}</small>}
          <hr/>
          <p><b>Scan-to-Own</b>: بعد الشراء وسكّ الـNFT، اكتب رابط الشهادة على وسم NFC من صفحة <a href="/nfc">/nfc</a>.</p>
        </div>
      </div>
    </div>
  );
}