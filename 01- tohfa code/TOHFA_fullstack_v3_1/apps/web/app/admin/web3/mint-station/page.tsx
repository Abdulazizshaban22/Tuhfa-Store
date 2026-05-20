'use client';
import { useState } from 'react';

export default function MintStation() {
  const [to,setTo] = useState('');
  const [tokenURI,setTokenURI] = useState('ipfs://example-token-metadata');
  const [nfc,setNfc] = useState('');
  const [contract,setContract] = useState('');
  const [tokenId,setTokenId] = useState('');
  const [out,setOut] = useState<any>(null);

  const mint = async () => {
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/mint721',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({to, tokenURI})});
    const j = await res.json(); setOut(j);
  };
  const link = async () => {
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/web3/link-nfc',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ tagUid: nfc, contract, tokenId })});
    const j = await res.json(); setOut(j);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Mint Station — سكّ NFT وربط NFC</h1>
      <p className="opacity-70 mb-4">استخدم محفظة المسؤول على الخادم أو صف طابور سكّ إذا لم تُضبط المتغيّرات.</p>
      <div className="grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <section className="border rounded p-4">
          <h2 className="font-bold mb-2">1) سكّ ERC-721</h2>
          <input placeholder="Recipient address (to)" value={to} onChange={e=>setTo(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <input placeholder="tokenURI (ipfs://...)" value={tokenURI} onChange={e=>setTokenURI(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <button onClick={mint} className="px-4 py-2 rounded bg-black text-white">Mint</button>
        </section>
        <section className="border rounded p-4">
          <h2 className="font-bold mb-2">2) ربط NFC ← NFT</h2>
          <input placeholder="NFC UID (hex)" value={nfc} onChange={e=>setNfc(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <input placeholder="Contract address (0x...)" value={contract} onChange={e=>setContract(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <input placeholder="Token ID" value={tokenId} onChange={e=>setTokenId(e.target.value)} className="border rounded p-2 w-full mb-2"/>
          <button onClick={link} className="px-4 py-2 rounded bg-black text-white">LINK</button>
        </section>
      </div>
      <pre className="border rounded p-3 mt-4">{JSON.stringify(out, null, 2)}</pre>
      <p className="opacity-60 mt-2 text-sm">ملاحظة: لسكّ مباشر، اضبط ENV: ETH_RPC, TOHFA_ERC721, OWNER_PK.</p>
    </main>
  );
}
