
'use client';
import { useState } from 'react';
export default function NFCWrite(){
  const [contract,setContract] = useState('');
  const [tokenId,setTokenId] = useState('');
  const [out,setOut] = useState<any>(null);
  const writeTag = async ()=>{
    // @ts-ignore
    if(!('NDEFReader' in window)){ alert('Web NFC غير مدعوم'); return; }
    try{
      // @ts-ignore
      const ndef = new window.NDEFReader();
      const url = location.origin + '/certificate/view?contract='+encodeURIComponent(contract)+'&tokenId='+encodeURIComponent(tokenId);
      await ndef.write({ records:[{ recordType:'url', data:url }] });
      setOut({ ok:true, url });
    }catch(e:any){ setOut({ ok:false, error: e?.message||String(e)}); }
  };
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>Scan‑to‑Own — كتابة رابط الشهادة على NFC</h1>
      <input placeholder="Contract 0x..." value={contract} onChange={e=>setContract(e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:6,display:'block',marginBottom:8}}/>
      <input placeholder="Token ID" value={tokenId} onChange={e=>setTokenId(e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:6,display:'block',marginBottom:8}}/>
      <button onClick={writeTag} style={{padding:'8px 12px', background:'#000', color:'#fff'}}>اكتب على الوسم</button>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12, marginTop:12}}>{JSON.stringify(out,null,2)}</pre>
    </main>
  );
}
