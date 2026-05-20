'use client'
import { useEffect, useState } from 'react'

export default function Dashboard(){
  const [series, setSeries] = useState<any[]>([])
  useEffect(()=>{
    fetch('/api/payments/series').then(r=>r.json()).then(setSeries)
  },[])
  return (
    <main style={{padding:24}}>
      <h1>لوحة زمنية — المبيعات والزوار</h1>
      <pre style={{background:'#f7f7f7',padding:12}}>{JSON.stringify(series,null,2)}</pre>
      <p>اربط هذه الصفحة بمكتبة رسوميات (Chart.js) لاحقًا.</p>
    </main>
  )
}
