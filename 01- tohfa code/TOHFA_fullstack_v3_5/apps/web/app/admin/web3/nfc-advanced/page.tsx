
'use client';
import React, { useState } from 'react';
import { useAccount, useSignMessage, useSignTypedData } from 'wagmi';

export default function NFCAdvanced(){
  const { address, chainId } = useAccount();
  const [contract,setContract] = useState('');
  const [tokenId,setTokenId] = useState('');
  const [note,setNote] = useState('Tohfa ownership link');
  const [out,setOut] = useState<any>(null);
  const msg = `Tohfa Scan-to-Own — contract=${contract}, tokenId=${tokenId}`;

  const { signMessageAsync } = useSignMessage();
  const { signTypedDataAsync } = useSignTypedData();

  const writeMulti = async ()=>{
    // @ts-ignore
    if(!('NDEFReader' in window)){ alert('Web NFC غير مدعوم'); return; }
    if(!contract || !tokenId){ alert('أكمل الحقول'); return; }
    try{
      const certificateUrl = location.origin + '/certificate/view?contract='+encodeURIComponent(contract)+'&tokenId='+encodeURIComponent(tokenId);
      // EIP‑191 (message) signature
      const sigMsg = address ? await signMessageAsync({ message: msg }) : '0x';
      // EIP‑712 (typed) signature
      const domain = { name:'TohfaNDEF', version:'1', chainId: chainId||1, verifyingContract:'0x0000000000000000000000000000000000000000' };
      const types = { NDEFLink:[{name:'contract',type:'address'},{name:'tokenId',type:'uint256'},{name:'url',type:'string'}] };
      const value = { contract, tokenId: String(tokenId), url: certificateUrl };
      const sigTyped = address ? await signTypedDataAsync({ domain, types, primaryType:'NDEFLink', message:value }) : '0x';

      const payload = { t:'TohfaNDEF', v:value, sig:{ msg:sigMsg, typed:sigTyped }, address, ts: Date.now(), note };
      // @ts-ignore
      const ndef = new window.NDEFReader();
      await ndef.write({
        records: [
          { recordType:'url', data: certificateUrl },
          { recordType:'text', data: `sig:${sigMsg.slice(0,20)}…`, },
          { recordType:'mime', mediaType: 'application/json', data: new TextEncoder().encode(JSON.stringify(payload)) }
        ]
      });
      setOut({ ok:true, certificateUrl, payload });
    }catch(e:any){
      setOut({ ok:false, error: e?.message||String(e) });
    }
  };

  const scanToView = async ()=>{
    // @ts-ignore
    if(!('NDEFReader' in window)){ alert('Web NFC غير مدعوم'); return; }
    try{
      // @ts-ignore
      const ndef = new window.NDEFReader();
      await ndef.scan();
      // @ts-ignore
      ndef.addEventListener('reading', (ev:any)=>{
        const recs = ev.message?.records||[];
        for(const r of recs){
          if (r.recordType === 'url') {
            try { const url = r.data || ''; if (url) { window.location.href = url; return; } } catch {}
          }
          if (r.mediaType === 'application/json') {
            try { const txt = new TextDecoder().decode(r.data); const j = JSON.parse(txt); if (j?.v?.url) { window.location.href = j.v.url; return; } } catch {}
          }
        }
        alert('لم يتم العثور على رابط شهادة داخل الوسم.');
      });
    }catch(e:any){ setOut({ ok:false, error: e?.message||String(e) }); }
  };

  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>NFC متقدم — كتابة سجلات متعددة + Scan‑to‑View</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <input placeholder="Contract 0x..." value={contract} onChange={e=>setContract(e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:6}}/>
        <input placeholder="Token ID" value={tokenId} onChange={e=>setTokenId(e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:6}}/>
      </div>
      <textarea placeholder="ملاحظة/وصف (اختياري)" value={note} onChange={e=>setNote(e.target.value)} rows={3} style={{display:'block',width:'100%',marginTop:8,padding:8,border:'1px solid #ddd',borderRadius:6}} />
      <div style={{display:'flex',gap:12,marginTop:8}}>
        <button onClick={writeMulti} style={{padding:'8px 12px', background:'#000', color:'#fff'}}>اكتب NDEF متعدد</button>
        <button onClick={scanToView} style={{padding:'8px 12px'}}>Scan‑to‑View</button>
        <div style={{marginInlineStart:8}}><appkit-button /></div>
      </div>
      <div style={{marginTop:10, fontSize:12, opacity:.7}}>
        الموقّع: {address || '—'} — السلسلة: {chainId || '—'}
      </div>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12, marginTop:12}}>{JSON.stringify(out,null,2)}</pre>
      <p style={{opacity:.6, fontSize:12}}>الكتابة تستخدم <code>NDEFReader.write()</code> مع عدة سجلات (URL + نص موقّع + JSON). المسح يستخدم <code>NDEFReader.scan()</code> ثم فتح الشهادة تلقائيًا.</p>
    </main>
  );
}
