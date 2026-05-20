
'use client'
import React, {useState} from 'react';
export default function Forecast(){
  const [series, setSeries] = useState('2025-06-01,120\n2025-06-02,133\n2025-06-03,98');
  const [result, setResult] = useState<any>(null);
  async function run(model:'prophet'|'xgb'){
    const res = await fetch('/api/sovereign/forecast', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({model, csv:series})});
    const data = await res.json(); setResult(data);
  }
  return (
    <main style={{padding:24, maxWidth:900, margin:'0 auto'}}>
      <h1>AI Cultural Forecasting</h1>
      <p>الصق سلسلة زمنية (ds,y) للتنبؤ (زيارات، تذاكر، اهتمام).</p>
      <textarea value={series} onChange={e=>setSeries(e.target.value)} rows={6} style={{width:'100%'}}/>
      <div style={{height:8}}/>
      <button onClick={()=>run('prophet')}>Prophet (fallback)</button>
      <button onClick={()=>run('xgb')} style={{marginInlineStart:8}}>XGB (fallback)</button>
      <div style={{height:16}}/>
      {result && <pre style={{background:'#f8f8f8', padding:12, borderRadius:8, maxHeight:360, overflow:'auto'}}>{JSON.stringify(result,null,2)}</pre>}
    </main>
  );
}
