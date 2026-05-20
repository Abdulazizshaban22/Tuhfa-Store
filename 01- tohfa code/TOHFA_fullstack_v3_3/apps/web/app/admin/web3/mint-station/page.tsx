'use client';
import { useEffect, useState } from 'react';

declare global { interface Window { ethereum?: any } }

export default function MintStation() {
  const [account,setAccount] = useState<string>('');
  const [chainId,setChainId] = useState<number>(1);
  const [to,setTo] = useState('');
  const [tokenURI,setTokenURI] = useState('ipfs://example-token-metadata');
  const [nfc,setNfc] = useState('');
  const [contract,setContract] = useState('');
  const [tokenId,setTokenId] = useState('');
  const [out,setOut] = useState<any>(null);

  useEffect(()=>{
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_chainId' }).then((cid:string)=> setChainId(parseInt(cid,16))).catch(()=>{});
      window.ethereum.on?.('chainChanged', (cid:string)=> setChainId(parseInt(cid,16)));
    }
  },[]);

  const connect = async () => {
    if (!window.ethereum) { alert('No wallet found'); return; }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  };

  const mint = async () => {
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/mint721',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({to: to || account, tokenURI})});
    const j = await res.json(); setOut(j);
  };

  const signAndLink = async () => {
    if (!window.ethereum) return alert('No wallet');
    if (!nfc || !contract || !tokenId) return alert('أكمل الحقول');
    const h = await (await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/nfc/hash',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ uid: nfc })})).json();
    const tagHash = h.tagHash;
    const td = await (await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/eip712/link-typed-data',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chainId, tagHash, contract, tokenId })})).json();
    const from = account || (await window.ethereum.request({ method:'eth_requestAccounts' }))[0];
    const signature = await window.ethereum.request({ method: 'eth_signTypedData_v4', params: [from, JSON.stringify(td)] });
    const saved = await (await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/eip712/verify-link',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ signature, typedData: td })})).json();
    setOut(saved);
  };

  const scanNfc = async () => {
    try {
      // @ts-ignore
      if (!('NDEFReader' in window)) { alert('المتصفح لا يدعم Web NFC'); return; }
      // @ts-ignore
      const ndef = new window.NDEFReader();
      await ndef.scan();
      // @ts-ignore
      ndef.addEventListener('reading', (e: any)=>{
        try {
          const u = (e.serialNumber || e.tag?.id || '').toString();
          setNfc(u);
          alert('تم قراءة UID: ' + u);
        } catch {}
      });
    } catch (err:any) {
      alert('تعذّر استخدام NFC: ' + (err?.message || err));
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Mint Station — سكّ NFT • ربط NFC (EIP‑712)</h1>
      <div className="mb-3">
        {account ? <div>المحفظة: <b>{account}</b> — السلسلة: <b>{chainId}</b></div> : <button onClick={connect} className="px-4 py-2 rounded bg-black text-white">اتصال بالمحفظة</button>}
      </div>

      <div className="grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <section className="border rounded p-4">
          <h2 className="font-bold mb-2">1) سكّ ERC-721</h2>
          <input placeholder="Recipient address (to)" value={to} onChange={e=>setTo(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <input placeholder="tokenURI (ipfs://...)" value={tokenURI} onChange={e=>setTokenURI(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <button onClick={mint} className="px-4 py-2 rounded bg-black text-white">Mint</button>
        </section>

        <section className="border rounded p-4">
          <h2 className="font-bold mb-2">2) ربط NFC ← NFT (EIP‑712)</h2>
          <div className="flex" style={{display:'flex', gap:8}}>
            <input placeholder="NFC UID (scan)" value={nfc} onChange={e=>setNfc(e.target.value)} className="border rounded p-2 w-full mb-2"/>
            <button onClick={scanNfc} className="px-3 py-2 border rounded">Scan NFC</button>
          </div>
          <input placeholder="Contract address (0x...)" value={contract} onChange={e=>setContract(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <input placeholder="Token ID" value={tokenId} onChange={e=>setTokenId(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <button onClick={signAndLink} className="px-4 py-2 rounded bg-black text-white">Sign & LINK</button>
        </section>
      </div>

      <pre className="border rounded p-3 mt-4">{JSON.stringify(out, null, 2)}</pre>
      <p className="opacity-60 mt-2 text-sm">
        ملاحظة: توقيع EIP‑712 يتبع المعيار الرسمي، ويدعم MetaMask عبر <code>eth_signTypedData_v4</code>. Web NFC تجريبي ويعمل أساسًا على Chrome Android.
      </p>
    </main>
  );
}
