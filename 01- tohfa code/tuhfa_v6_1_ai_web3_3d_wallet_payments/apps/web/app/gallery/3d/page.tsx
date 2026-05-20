
'use client';
import React, { useEffect, useRef } from 'react';
export default function Gallery3D(){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!ref.current) return;
    ref.current.innerHTML = `
      <div style="max-width:960px;margin:auto">
        <h2 dir="rtl">عارض ثلاثي الأبعاد (Three.js / model-viewer)</h2>
        <p dir="rtl">اربط GLB يحوي XMP عبر KHR_xmp_json_ld. تظهر معلومات الأصالة بجانب العارض.</p>
        <div style="height:440px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;border-radius:12px">
          3D Viewer Placeholder — اربط three.js / model-viewer هنا
        </div>
      </div>
    `;
  },[]);
  return <div ref={ref} />;
}
