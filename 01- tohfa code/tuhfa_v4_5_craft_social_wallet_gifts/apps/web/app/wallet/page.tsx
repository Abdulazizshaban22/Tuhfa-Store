
'use client'
import React, {useEffect, useState} from 'react';
type Asset = { tokenId:string; name:string; image?:string; certificateUrl:string };
export default function Wallet(){
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(()=>{ fetch('/api/wallet/assets').then(r=>r.json()).then(setAssets); },[]);
  return (
    <main style={{padding:24}}>
      <h1>Tuhfa Wallet — مقتنياتك وشهادات الأصالة</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {assets.map(a=>(
          <div key={a.tokenId} style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
            {a.image && <img src={a.image} alt="" style={{width:'100%',borderRadius:6}}/>}
            <h3 style={{margin:'8px 0 4px'}}>{a.name}</h3>
            <a href={a.certificateUrl} target="_blank">عرض الشهادة</a>
            <div style={{height:8}}/>
            <a href={`/wallet/sell?tokenId=${a.tokenId}`}><button>عرض للبيع</button></a>
          </div>
        ))}
      </div>
    </main>
  );
}
