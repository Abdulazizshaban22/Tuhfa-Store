
'use client'
import { useEffect, useState } from 'react'
export default function Dashboard(){
  const [data,setData] = useState<any>(null)
  useEffect(()=>{ fetch('/api/metrics/overview').then(r=>r.json()).then(setData) },[])
  return <main style={{padding:24}}>
    <h2>لوحة الزمن — المبيعات والزوار</h2>
    <pre style={{background:'#f7f7f7',padding:12}}>{JSON.stringify(data,null,2)}</pre>
  </main>
}
