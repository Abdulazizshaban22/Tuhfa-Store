import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Museum(){
  const { query } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!ref.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, ref.current.clientWidth/ref.current.clientHeight, 0.1, 1000);
    camera.position.set(0,1.2,2.5);
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    ref.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);

    const loader = new GLTFLoader();
    const url = (query.slug as string) || '/assets/sample.glb'; // placeholder
    loader.load(url, (gltf)=>{
      scene.add(gltf.scene);
      setLoading(false);
    });

    function onResize(){
      if(!ref.current) return;
      const w = ref.current.clientWidth;
      const h = ref.current.clientHeight;
      camera.aspect = w/h; camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    }
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return ()=>{
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      ref.current?.removeChild(renderer.domElement);
    };
  }, [ref.current, query.slug]);

  const sku = (query.sku as string) || 'TUHFA-0001';
  async function buy(){
    const r = await fetch('/api/payments/tap/create', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ amount: 100, method:'applepay' }) });
    const j = await r.json();
    if(j.redirect_url) window.location.href = j.redirect_url;
  }

  return (
    <div className="container">
      <h1>معرض ثلاثي الأبعاد</h1>
      <div style={{position:'relative', width:'100%', height:'60vh', borderRadius:12, overflow:'hidden'}}>
        <div ref={ref} style={{width:'100%', height:'100%'}}/>
        <button className="btn" onClick={buy} style={{position:'absolute', right:16, bottom:16}}>Buy Now</button>
        {loading && <div className="card" style={{position:'absolute', left:16, bottom:16}}>جار التحميل…</div>}
      </div>
      <p>SKU: {sku}</p>
    </div>
  );
}