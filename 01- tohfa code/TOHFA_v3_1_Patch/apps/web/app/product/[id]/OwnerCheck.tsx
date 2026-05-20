'use client'
import { useEffect, useState } from 'react'

export default function OwnerCheck({ externalId, apiBase }:{ externalId: string, apiBase: string }){
  const [owner,setOwner] = useState<any>(null)
  const [addr,setAddr] = useState<string>('')
  const [res,setRes] = useState<any>(null)

  async function fetchOwner(){
    const r = await fetch(`${apiBase}/web3/nft/${externalId}/owner`, { cache:'no-store' })
    const d = await r.json(); setOwner(d)
  }
  async function mint(){
    const r = await fetch(`${apiBase}/web3/nft/${externalId}/mint`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ownerAddress: addr })
    })
    const d = await r.json(); setRes(d); fetchOwner();
  }

  useEffect(()=>{ fetchOwner() },[])
  return (<div style={{borderTop:'1px solid #eee', marginTop:16, paddingTop:12}}>
    <h4>الملكية الرقمية (NFT)</h4>
    <div style={{fontSize:13,color:'#555'}}>
      {owner?.exists ? <>المالك الحالي: <b>{owner.owner}</b> (Token #{owner.tokenId})</> : 'لا توجد شهادة رقمية بعد'}
    </div>
    <div style={{marginTop:8}}>
      <input placeholder="عنوان المحفظة 0x..." value={addr} onChange={e=>setAddr(e.target.value)} style={{width:'60%'}} />
      <button onClick={mint} style={{marginInlineStart:8}}>إصدار شهادة أصالة</button>
    </div>
    {res && <pre style={{background:'#f7f7f7',padding:8,marginTop:8,overflow:'auto'}}>{JSON.stringify(res,null,2)}</pre>}
  </div>)
}
