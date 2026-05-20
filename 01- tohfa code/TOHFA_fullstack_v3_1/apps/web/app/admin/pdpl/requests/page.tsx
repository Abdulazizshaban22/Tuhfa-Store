'use client';
import { useEffect, useState } from 'react';

type Item = { id:string, subjectEmail:string, type:string, status:string, receivedAt:string, resolvedAt?:string, note?:string };

export default function PDPLPage() {
  const [items,setItems] = useState<Item[]>([]);
  const [email,setEmail] = useState('user@example.com');
  const [type,setType] = useState('access');
  const [details,setDetails] = useState('{}');
  const reload = async ()=>{
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/pdpl/requests', {cache:'no-store'});
    const j = await res.json(); setItems(j.items || []);
  };
  useEffect(()=>{ reload(); },[]);

  const submit = async ()=>{
    const res = await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/pdpl/requests',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ subjectEmail: email, type, details: JSON.parse(details||'{}') })
    });
    await res.json(); await reload();
  };
  const resolve = async (id:string)=>{
    await fetch((process.env.NEXT_PUBLIC_API_BASE||'')+'/api/admin/pdpl/requests/'+id+'/resolve',{
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status:'closed' })
    });
    await reload();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-3">لوحة PDPL — طلبات أصحاب البيانات</h1>
      <div className="border rounded p-4 mb-4">
        <h2 className="font-bold mb-2">إنشاء طلب جديد</h2>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="البريد" className="border rounded p-2"/>
          <select value={type} onChange={e=>setType(e.target.value)} className="border rounded p-2">
            <option value="access">Access</option>
            <option value="rectify">Rectify</option>
            <option value="erase">Erase</option>
            <option value="portability">Portability</option>
            <option value="restrict">Restrict</option>
            <option value="withdraw-consent">Withdraw Consent</option>
          </select>
        </div>
        <textarea value={details} onChange={e=>setDetails(e.target.value)} className="border rounded p-2 w-full mt-2" rows={4} placeholder='{"scope":"orders"}'/>
        <button onClick={submit} className="px-4 py-2 rounded bg-black text-white mt-2">أرسل الطلب</button>
      </div>

      <table className="w-full border" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr><th className="border p-2">Email</th><th className="border p-2">Type</th><th className="border p-2">Status</th><th className="border p-2">Received</th><th className="border p-2">Action</th></tr>
        </thead>
        <tbody>
          {items.map((it)=>(
            <tr key={it.id}>
              <td className="border p-2">{it.subjectEmail}</td>
              <td className="border p-2">{it.type}</td>
              <td className="border p-2">{it.status}</td>
              <td className="border p-2">{new Date(it.receivedAt).toLocaleString()}</td>
              <td className="border p-2"><button onClick={()=>resolve(it.id)} className="px-3 py-1 border rounded">إغلاق</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="opacity-60 mt-2 text-sm">الأنواع أعلاه متوافقة مع حقوق PDPL: الإبلاغ، الوصول، التصحيح، المحو، التقييد، سحب الموافقة، وقابلية النقل.</p>
    </main>
  );
}
