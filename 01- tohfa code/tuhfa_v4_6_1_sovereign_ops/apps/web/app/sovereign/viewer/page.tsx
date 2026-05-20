
'use client'
import React, { useEffect, useRef, useState } from 'react';

declare global { interface Window { OpenSeadragon:any } }

export default function IIIFViewer(){
  const ref = useRef<HTMLDivElement>(null);
  const [infoUrl, setInfoUrl] = useState('http://localhost:8182/iiif/2/test.tif/info.json'); // نقطة info.json من Cantaloupe
  useEffect(()=>{
    if(!ref.current || !window.OpenSeadragon) return;
    const viewer = window.OpenSeadragon({
      element: ref.current,
      tileSources: infoUrl, // IIIF info.json
      prefixUrl: '/openseadragon-images/',
      showNavigator: true,
    });
    return ()=> viewer && viewer.destroy();
  }, [infoUrl]);
  return (
    <main style={{padding:24}}>
      <h1>IIIF High-Res Viewer (OpenSeadragon)</h1>
      <input value={infoUrl} onChange={e=>setInfoUrl(e.target.value)} style={{width:'100%', padding:12}} />
      <div style={{height:12}}/>
      <div ref={ref} style={{height:'70vh', background:'#000'}}/>
      <p style={{marginTop:8, color:'#666'}}>مرر رابط IIIF info.json أعلاه (من Cantaloupe/Loris).</p>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/openseadragon.min.js"></script>
    </main>
  );
}
