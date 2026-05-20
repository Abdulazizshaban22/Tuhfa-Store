import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CertificatePage(){
  const { query } = useRouter();
  const [data, setData] = useState<any>(null);
  const [xmp, setXmp] = useState<any>(null);
  const [err, setErr] = useState<string|undefined>();

  useEffect(()=>{
    const tokenId = query.tokenId as string;
    if(!tokenId) return;
    (async ()=>{
      try{
        const info = await fetch(`/api/certificate/info?tokenId=${tokenId}`).then(r=>r.json());
        setData(info);
        if(info.tokenURI && info.tokenURI.endsWith('.glb')){
          const xx = await fetch(`/api/xmp/extract?url=${encodeURIComponent(info.tokenURI)}`).then(r=>r.json());
          setXmp(xx);
        }
      }catch(e:any){ setErr(e?.message||'failed'); }
    })();
  }, [query.tokenId]);

  return (
    <div className="container">
      <h1>شهادة الملكية</h1>
      {err && <div className="card"><b>خطأ:</b> {err}</div>}
      {data && <div className="card">
        <p><b>Token:</b> #{data.tokenId}</p>
        <p><b>Owner:</b> {data.owner}</p>
        <p><b>tokenURI:</b> {data.tokenURI}</p>
      </div>}
      {xmp && <div className="card">
        <h3>XMP (KHR_xmp_json_ld)</h3>
        <pre>{JSON.stringify(xmp, null, 2)}</pre>
      </div>}
    </div>
  );
}
