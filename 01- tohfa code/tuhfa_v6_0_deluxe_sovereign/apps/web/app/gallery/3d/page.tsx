
'use client';
import React, { useRef, useEffect } from 'react';

export default function Gallery3D(){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    // Placeholder: inject a <model-viewer> if available, else a note.
    if(!ref.current) return;
    ref.current.innerHTML = `
      <div style="max-width:900px;margin:auto">
        <h2 dir="rtl">عارض ثلاثي الأبعاد (تجريبي)</h2>
        <p dir="rtl">هنا نربط ملف GLB يتضمن XMP عبر امتداد KHR_xmp_json_ld لإثبات المصدر.</p>
        <div style="height:420px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;borderRadius:12px">
          <span>3D Viewer Placeholder — اربط three.js / model-viewer هنا</span>
        </div>
      </div>
    `;
  },[]);
  return <div ref={ref} />;
}
