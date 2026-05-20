
'use client'
import React, {useEffect, useState} from 'react';

type Manifest = { id:string; label?:any; items?:any[] };
export default function Vault(){
  const [manifest, setManifest] = useState<Manifest|null>(null);
  const [url, setUrl] = useState('/iiif/sample-manifest.json');
  async function load(){
    const res = await fetch(url);
    const data = await res.json();
    setManifest(data);
  }
  useEffect(()=>{ load(); },[]);
  return (
    <main style={{padding:24, maxWidth:960, margin:'0 auto'}}>
      <h1>National Heritage Vault — IIIF</h1>
      <div style={{display:'flex', gap:8}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1,padding:12}} placeholder="Manifest URL"/>
        <button onClick={load}>Load Manifest</button>
      </div>
      <div style={{height:16}}/>
      {!manifest && <p>جاري التحميل...</p>}
      {manifest && (
        <section>
          <pre style={{background:'#f8f8f8', padding:12, borderRadius:8, maxHeight:360, overflow:'auto'}}>{JSON.stringify(manifest,null,2)}</pre>
          <p style={{color:'#666'}}>يعرض أعلاه IIIF Presentation 3 Manifest (JSON-LD).</p>
        </section>
      )}
    </main>
  );
}
