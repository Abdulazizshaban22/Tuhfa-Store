'use client';
import { useEffect, useState } from 'react';

export default function Live() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(()=>{
    const url = (process.env.NEXT_PUBLIC_API_BASE || '') + '/api/metrics/stream';
    const es = new EventSource(url);
    es.onmessage = ev => {
      try {
        const j = JSON.parse(ev.data);
        const ts = new Date(j.time).toLocaleTimeString();
        const preview = String(j.text).split('\n').slice(0,6).join('\n');
        setLines(prev => [`[${ts}]`, preview, '---', ...prev].slice(0,200));
      } catch { setLines(prev => [ev.data, ...prev].slice(0,200)); }
    };
    return ()=> es.close();
  },[]);
  return <main className="p-6"><h1 className="text-2xl font-bold mb-3">البث الحي</h1><pre className="border rounded p-3">{lines.join('\n')}</pre></main>;
}
