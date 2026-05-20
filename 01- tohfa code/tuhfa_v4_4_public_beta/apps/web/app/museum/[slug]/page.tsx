
'use client'
import React, {useEffect} from 'react'
export default function Museum({params}:{params:{slug:string}}){
  useEffect(()=>{
    console.log('Load three.js scene for museum:', params.slug);
  }, [params.slug]);
  return (
    <main style={{padding:24}}>
      <h1>Museum — {params.slug}</h1>
      <p>عارض ثلاثي الأبعاد (GLTF/GLB) سيظهر هنا باستخدام Three.js GLTFLoader.</p>
      <button onClick={()=>location.href='/checkout'}>Buy In-Scene</button>
    </main>
  );
}
