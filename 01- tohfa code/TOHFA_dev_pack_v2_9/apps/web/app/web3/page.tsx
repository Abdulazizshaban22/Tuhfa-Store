'use client';
import { useEffect, useState } from 'react';

export default function Web3Connect() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Web3 — WalletConnect / Web3Modal</h1>
      <p className="opacity-70">اربط محفظتك وابدأ التوقيع والتعامل مع العقود.</p>
      <div className="mt-4 border rounded p-4">ضع هنا تهيئة Web3Modal وفق وثائق WalletConnect v2.</div>
    </main>
  );
}
