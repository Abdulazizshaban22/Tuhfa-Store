
'use client'
import L from 'leaflet';
import React, {useEffect, useRef} from 'react';

export default function Runtime(){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!ref.current) return;
    const map = L.map(ref.current).setView([24.7136, 46.6753], 6); // Riyadh
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
    // demo points
    const sites = [
      { name:'المتحف الوطني', lat:24.6869, lng:46.7097 },
      { name:'متحف جدة الإقليمي', lat:21.5433, lng:39.1728 },
    ];
    sites.forEach(s=> L.marker([s.lat, s.lng]).addTo(map).bindPopup(s.name));
    return ()=>{ map.remove(); };
  },[]);
  return <div ref={ref} style={{height:'70vh', width:'100%'}}/>;
}
