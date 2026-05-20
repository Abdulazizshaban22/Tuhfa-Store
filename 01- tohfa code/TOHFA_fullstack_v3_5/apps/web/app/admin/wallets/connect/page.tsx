
'use client';
import { useAccount } from 'wagmi';

export default function WalletsPage(){
  const { address, status } = useAccount();
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>اتصال المحافظ — AppKit + Wagmi</h1>
      <p style={{opacity:.7}}>زر AppKit الجاهز بالأسفل (بدون CDN).</p>
      <div style={{marginTop:12}}><appkit-button /></div>
      <div style={{marginTop:12}}>الحالة: <b>{status}</b> — العنوان: <b>{address||'—'}</b></div>
      <p style={{opacity:.6, fontSize:12, marginTop:8}}>للتخصيص المتقدم استخدم Hooks من AppKit/Wagmi.</p>
    </main>
  );
}
