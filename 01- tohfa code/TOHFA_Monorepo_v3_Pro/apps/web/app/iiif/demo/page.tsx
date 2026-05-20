'use client'
import { useEffect, useRef } from 'react'
export default function IiifDemo(){
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/openseadragon.min.js'; s.onload = ()=>{
      // @ts-ignore
      const viewer = window.OpenSeadragon({
        id: 'osd', prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
        tileSources: { '@context':'http://iiif.io/api/presentation/3/context.json', type:'image', id:'https://iiif.harvardartmuseums.org/ids/iiif/18727579/full/full/0/default.jpg' }
      })
    }; document.body.appendChild(s)
  },[])
  return (<div><h1>عارض IIIF</h1><div id="osd" ref={ref} style={{width:'100%',height:500,background:'#eee'}} /></div>)
}
