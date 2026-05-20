'use client'
import { useEffect } from 'react'

export default function CulturalMap(){
  useEffect(()=>{
    const L = (window as any).L
    const map = L.map('map').setView([24.7136, 46.6753], 5) // KSA
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map)
    fetch('/api/ai/cultural-map').then(r=>r.json()).then(points=>{
      points.forEach((p:any)=> L.circleMarker([p.lat,p.lon]).addTo(map).bindPopup(p.label))
    })
  },[])
  return (
    <main style={{padding:0}}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <div id="map" style={{height:'calc(100vh - 56px)'}}></div>
    </main>
  )
}
