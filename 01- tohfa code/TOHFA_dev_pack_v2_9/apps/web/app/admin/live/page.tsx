'use client';
import { useEffect, useRef, useState } from 'react';

export default function LiveMetricsPage() {
  const [lines, setLines] = useState<string[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_API_BASE || '') + '/admin/metrics/stream';
    const es = new EventSource(url);
    es.onmessage = (ev) => {
      try {
        const j = JSON.parse(ev.data);
        const ts = new Date(j.time).toLocaleTimeString();
        const first = String(j.text || '').split('\n').slice(0, 6).join('\n');
        setLines(prev => [`[${ts}]`, first, '---', ...prev].slice(0, 200));
      } catch {
        setLines(prev => [ev.data, ...prev].slice(0, 200));
      }
    };
    es.onerror = () => { /* swallow network errors */ };
    esRef.current = es;
    return () => { es.close(); };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">البث الحي للمؤشرات (SSE)</h1>
      <p className="opacity-70 mb-4">تدفُّق مباشر كل ثانيتين من /admin/metrics/stream</p>
      <pre className="border rounded p-3 overflow-auto h-[60vh] whitespace-pre-wrap">{lines.join('\n')}</pre>
    </main>
  );
}
