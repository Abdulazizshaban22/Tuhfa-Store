'use client'
import { useState } from 'react'

export default function Viewer3D(){
  const [url, setUrl] = useState('')
  const [xmp, setXmp] = useState<any>(null)
  async function inspect(){
    const r = await fetch('/api/xmp/inspect?url=' + encodeURIComponent(url))
    const j = await r.json()
    setXmp(j)
  }
  return (
    <main style={{padding:24}}>
      <h1>عارض 3D + XMP</h1>
      <input placeholder="GLB URL" value={url} onChange={e=>setUrl(e.target.value)} style={{minWidth:360}}/>
      <button onClick={inspect}>تحليل XMP</button>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr', gap:12, marginTop:12}}>
        <div>
          <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
          <model-viewer src={url} ar camera-controls style={{width:'100%',height:480, background:'#fafafa'}}></model-viewer>
        </div>
        <pre style={{background:'#f7f7f7',padding:12,overflow:'auto',maxHeight:480}}>
          {xmp ? JSON.stringify(xmp, null, 2) : 'لا توجد بيانات بعد.'}
        </pre>
      </div>
    </main>
  )
}
