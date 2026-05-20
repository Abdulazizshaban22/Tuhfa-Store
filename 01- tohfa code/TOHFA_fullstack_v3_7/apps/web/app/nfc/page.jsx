'use client'
export default function NFCPage(){
  async function writeTag(){
    try{
      const ndef = new NDEFReader();
      await ndef.write({
        records: [
          { recordType: "url", data: "https://tohfa.example/item/ABC123" },
          { recordType: "text", data: "تحفة — ربط NFC بالقطعة" }
        ]
      });
      alert('تمت الكتابة على الوسم.');
    }catch(e){ alert(e?.message||'خطأ');}
  }
  async function scanTag(){
    try{
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.onreading = (event) => {
        const records = event.message.records;
        alert('تمت القراءة: ' + records.length + ' سجل');
      };
    }catch(e){ alert(e?.message||'خطأ');}
  }
  return (
    <div>
      <h2>NFC</h2>
      <p>اكتب/اقرأ سجلات NDEF (Android/Chrome).</p>
      <button onClick={writeTag}>كتابة NDEF</button>
      <button onClick={scanTag}>قراءة NDEF</button>
    </div>
  );
}