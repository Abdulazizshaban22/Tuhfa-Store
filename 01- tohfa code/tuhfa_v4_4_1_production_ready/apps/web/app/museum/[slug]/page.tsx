
'use client'
import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Museum({params}:{params:{slug:string}}){
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0,1.5,3)
    const renderer = new THREE.WebGLRenderer({antialias:true})
    const mount = mountRef.current!
    renderer.setSize(mount.clientWidth || 800, mount.clientHeight || 600)
    mount.appendChild(renderer.domElement)
    scene.add(new THREE.AmbientLight(0xffffff, 1.0))
    const loader = new GLTFLoader()
    loader.load('/models/sample.glb', (gltf)=>{
      scene.add(gltf.scene)
      animate()
    })
    function animate(){ requestAnimationFrame(animate); renderer.render(scene, camera) }
    return ()=>{ renderer.dispose(); mount.removeChild(renderer.domElement) }
  }, [params.slug])

  return (
    <main style={{padding:24}}>
      <h1>Museum — {params.slug}</h1>
      <div ref={mountRef} style={{width:'100%', height:'60vh', background:'#111'}} />
      <div style={{height:12}}/>
      <button onClick={()=>location.href='/checkout'}>Buy In-Scene</button>
    </main>
  );
}
