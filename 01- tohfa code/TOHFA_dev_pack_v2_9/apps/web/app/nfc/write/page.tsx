'use client';
import { useState } from 'react';

export default function NfcWritePage() {
  const [status, setStatus] = useState<string>('');
  const [url, setUrl] = useState<string>('https://tohfa.example/nft/123');

  const writeTag = async () => {
    if (!('NDEFReader' in window)) {
      setStatus('Web NFC غير مدعوم في هذا المتصفح. جرّب Chrome على Android.');
      return;
    }
    try {
      // @ts-ignore
      const reader = new NDEFReader();
      await reader.write({ records: [{ recordType: 'url', data: url }] });
      setStatus('✅ تم الكتابة على الوسم.');
    } catch (e:any) {
      setStatus('فشل: ' + (e?.message || e));
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">الكتابة إلى وسوم NFC (Web NFC)</h1>
      <input className="border rounded p-2 w-full mb-3" value={url} onChange={e=>setUrl(e.target.value)} placeholder="ضع رابط شهادة القطعة" />
      <button onClick={writeTag} className="px-4 py-2 rounded bg-black text-white">اكتب الوسم</button>
      <p className="mt-3">{status}</p>
      <p className="opacity-70 mt-4 text-sm">ملاحظة: Web NFC يعمل على Chrome Android فقط، والقدرات محدودة (NDEF فقط).</p>
    </main>
  );
}
