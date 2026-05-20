
'use client';
import React, { useEffect, useRef, useState } from 'react';
export default function Gallery3D(){
  const ref = useRef<HTMLDivElement>(null);
  const [xmp,setXmp] = useState<any>(null);
  const url = '/assets/asset1.glb'; // ضع مسارك الفعلي هنا
  useEffect(()=>{
    if(!ref.current) return;
    ref.current.innerHTML = `
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <div style="max-width:980px;margin:auto">
        <h2 dir="rtl">عارض ثلاثي الأبعاد</h2>
        <model-viewer src="${url}" ar auto-rotate camera-controls style="width:100%;height:480px;border:1px solid #ddd;border-radius:12px"></model-viewer>
        <div id="xmp" style="margin-top:12px;font-family:monospace;white-space:pre-wrap"></div>
      </div>`;
    fetch(`/api/xmp/inspect?url=${encodeURIComponent(url)}`).then(r=>r.json()).then(setXmp);
  },[]);
  return <main dir="rtl" style={{padding:24}}>
    <div ref={ref} />
    <section style={{marginTop:16}}>
      <h3>بيانات XMP (إن وجدت)</h3>
      <pre style={{whiteSpace:'pre-wrap',background:'#fafafa',padding:12,border:'1px solid #eee',borderRadius:12}}>{xmp? JSON.stringify(xmp,null,2) : '—'}</pre>
    </section>
  </main>;
}
