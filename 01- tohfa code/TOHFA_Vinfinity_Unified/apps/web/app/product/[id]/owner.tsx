'use client';
import { useEffect, useState } from 'react';
export default function Owner({ externalId, apiBase }:{ externalId:string, apiBase:string }){
  const [addr,setAddr]=useState('0x000000000000000000000000000000000000dEaD');
  const [owner,setOwner]=useState<any>(null);
  const [res,setRes]=useState<any>(null);
  async function load(){ const r = await fetch(`${apiBase}/web3/nft/${externalId}/owner`); setOwner(await r.json()); }
  async function mint(){
    const r = await fetch(`${apiBase}/web3/nft/${externalId}/mint`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ownerAddress: addr }) });
    setRes(await r.json()); load();
  }
  useEffect(()=>{ load(); },[]);
  return <div style={{borderTop:'1px solid #eee',marginTop:16,paddingTop:12}}>
    <h3>الملكية الرقمية (NFT)</h3>
    <div style={{fontSize:13,color:'#555'}}>{owner?.exists? <>المالك: <b>{owner.owner}</b> (Token #{owner.tokenId})</> : 'لا توجد شهادة بعد'}</div>
    <div style={{marginTop:8}}>
      <input value={addr} onChange={e=>setAddr(e.target.value)} style={{width:'60%'}}/>
      <button onClick={mint} style={{marginInlineStart:8}}>إصدار</button>
    </div>
    {res && <pre style={{background:'#f7f7f7',padding:8}}>{JSON.stringify(res,null,2)}</pre>}
  </div>
}
