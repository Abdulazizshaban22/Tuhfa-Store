import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function CertificateQR(){
  const { query } = useRouter();
  const tokenId = (query.tokenId as string) || '';
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(()=>{
    if(!tokenId) return;
    const url = `${window.location.origin}/certificate/${tokenId}`;
    QRCode.toDataURL(url).then(setDataUrl);
  }, [tokenId]);

  return (
    <div className="container">
      <h1>شهادة الملكية — QR</h1>
      <p>امسح هذا الرمز لعرض تفاصيل الملكية وبيانات الأصالة.</p>
      {dataUrl && <img alt="qr" src={dataUrl} style={{width:240,height:240}}/>}
      <p><a className="btn" href={`/certificate/${tokenId}`}>فتح الشهادة</a></p>
    </div>
  );
}