import Link from 'next/link';
import dynamic from 'next/dynamic';

const WalletConnect = dynamic(() => import('../src/components/WalletConnect'), { ssr:false });

export default function Home(){
  return (
    <div className="container">
      <h1>تحفة — السوق الذكي للحِرف والمتاحف</h1>
      <div className="card">
        <p>من هنا تقدر تختبر الميزات الأساسية:</p>
        <ul>
          <li><Link href="/checkout">Checkout — الدفع المحلي (Tap/HyperPay)</Link></li>
          <li><Link href="/nfc">NFC — Scan / Write</Link></li>
        </ul>
        <small>v3.8 — Wallets + Payments + NFC + NFT (Amoy)</small>
      </div>
      <div className="card">
        <WalletConnect />
      </div>
    </div>
  );
}
