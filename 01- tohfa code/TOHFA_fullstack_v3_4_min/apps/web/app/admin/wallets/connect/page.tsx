
'use client';
import { useState, useEffect } from 'react';
declare global { interface Window { ethereum?: any; WalletConnectModal?: any; } }
export default function Wallets(){
  const [account,setAccount] = useState<string>('');
  const [wcReady,setWcReady] = useState(false);
  useEffect(()=>{
    const s = document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/@walletconnect/modal/dist/index.umd.js';
    s.onload=()=> setWcReady(true);
    document.body.appendChild(s);
    return ()=>{ document.body.removeChild(s); };
  },[]);
  const injected = async ()=>{
    if(!window.ethereum){ alert('لا توجد محفظة مدمجة'); return; }
    const accs = await window.ethereum.request({ method:'eth_requestAccounts' });
    setAccount(accs[0]);
  };
  const walletconnect = async ()=>{
    if(!wcReady || !window.WalletConnectModal){ alert('WalletConnect Modal غير متاح'); return; }
    // NOTE: replace projectId in production
    const modal = new window.WalletConnectModal({ projectId: 'demo-project-id', standaloneChains:['eip155:1'] });
    await modal.openModal();
  };
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>اتصال المحافظ</h1>
      <button onClick={injected} style={{padding:'8px 12px',marginRight:8, background:'#000', color:'#fff'}}>اتصال بالمحفظة المدمجة</button>
      <button onClick={walletconnect} style={{padding:'8px 12px'}}>اتصال عبر WalletConnect</button>
      <div style={{marginTop:12}}>الحساب: <b>{account||'—'}</b></div>
      <p style={{opacity:.6, fontSize:12}}>للدمج الكامل استخدم Web3Modal/Wagmi من خلال NPM داخل بيئة البناء.</p>
    </main>
  );
}
