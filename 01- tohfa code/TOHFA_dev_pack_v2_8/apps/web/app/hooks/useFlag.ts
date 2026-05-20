'use client';
import { useEffect, useState } from 'react';

export default function useFlag(key: string, fallback: boolean = false) {
  const [enabled, setEnabled] = useState<boolean>(fallback);

  useEffect(() => {
    let stop = false;
    async function load() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/flags/check?k=' + encodeURIComponent(key), { cache: 'no-store' });
        const j = await res.json();
        if (!stop) setEnabled(!!j?.enabled);
      } catch {}
    }
    load();
    const t = setInterval(load, 15000);
    return () => { stop = true; clearInterval(t); };
  }, [key]);

  return enabled;
}
