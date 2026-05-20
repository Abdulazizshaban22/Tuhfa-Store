
'use client';
import React, { useState } from 'react';

export default function NFCScan(){
  const [out,setOut] = useState<any>(null);
  const scan = async ()=>{
    // @ts-ignore
    if(!('NDEFReader' in window)){ alert('Web NFC غير مدعوم'); return; }
    try{
      // @ts-ignore
      const ndef = new window.NDEFReader();
      await ndef.scan();
      // @ts-ignore
      ndef.addEventListener('reading', (ev:any)=>{
        const results:any = { serial: ev.serialNumber, records: [] };
        for (const r of ev.message.records) {
          let entry:any = { recordType: r.recordType, mediaType: r.mediaType||null };
          try {
            if (r.recordType === 'url') entry.url = r.data || '';
            else if (r.recordType === 'text') entry.text = new TextDecoder(r.encoding||'utf-8').decode(r.data);
            else if (r.mediaType === 'application/json') entry.json = JSON.parse(new TextDecoder().decode(r.data));
            else entry.raw = Array.from(new Uint8Array(r.data||[]));
          } catch {}
          results.records.push(entry);
        }
        setOut(results);
      });
    }catch(e:any){ setOut({ ok:false, error: e?.message||String(e) }); }
  };

  const openCert = ()=>{
    const url = out?.records?.find((r:any)=> r.url)?.url || out?.records?.find((r:any)=> r.json?.v?.url)?.json?.v?.url;
    if (url) window.location.href = url;
    else alert('لا يوجد رابط شهادة في السجلّات.');
  };

  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:20,fontWeight:700}}>Scan‑to‑View — مسح الوسم وعرض البيانات</h1>
      <div style={{display:'flex', gap:12}}>
        <button onClick={scan} style={{padding:'8px 12px'}}>ابدأ المسح</button>
        <button onClick={openCert} style={{padding:'8px 12px'}}>فتح الشهادة</button>
      </div>
      <pre style={{border:'1px solid #eee',borderRadius:8,padding:12, marginTop:12}}>{JSON.stringify(out,null,2)}</pre>
    </main>
  );
}
