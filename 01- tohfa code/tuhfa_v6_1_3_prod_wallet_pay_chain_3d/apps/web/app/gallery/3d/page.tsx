
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
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:16;max-width:1100px;margin:auto">
        <div>
          <h2 dir="rtl">عارض ثلاثي الأبعاد</h2>
          <model-viewer src="${url}" ar auto-rotate camera-controls style="width:100%;height:520px;border:1px solid #ddd;border-radius:12px"></model-viewer>
        </div>
        <aside style="border:1px solid #eee;border-radius:12px;padding:12px">
          <h3>XMP — الأصالة والسياق</h3>
          <div id="xmp" style="font-family:monospace;white-space:pre-wrap"></div>
        </aside>
      </div>`;
    fetch(`/api/xmp/inspect?url=${encodeURIComponent(url)}`).then(r=>r.json()).then(js=>{
      setXmp(js?.xmp||null);
      const el = document.getElementById('xmp'); if(!el) return;
      el.textContent = js?.xmp? JSON.stringify(js.xmp,null,2) : '—';
    });
  },[]);
  return <main dir="rtl" style={{padding:24}}><div ref={ref} /></main>;
}
