import React, { useState } from 'react';

export default function NFC(){
  const [log, setLog] = useState<string[]>([]);
  const push = (s:string)=> setLog(prev=>[s,...prev].slice(0,50));

  async function scan(){
    try{
      // @ts-ignore
      const ndef = new NDEFReader();
      await ndef.scan();
      push('Scanning... tap a tag');
      ndef.onreading = (ev:any)=>{
        // @ts-ignore
        const decoder = new TextDecoder();
        let txt = '';
        for(const record of ev.message.records){
          if(record.recordType === 'text'){
            txt += decoder.decode(record.data);
          }
          if(record.recordType === 'url'){
            txt += `URL: ${decoder.decode(record.data)}`;
          }
        }
        push('Read: ' + txt);
      };
    }catch(err:any){
      push('Scan error: ' + err?.message);
    }
  }

  async function write(){
    try{
      // @ts-ignore
      const ndef = new NDEFReader();
      await ndef.write({ records: [{ recordType:'url', data: (typeof window!=='undefined'? window.location.origin: 'https://tuhfa.local') + '/scan' }] });
      push('Wrote a URL record');
    }catch(err:any){
      push('Write error: ' + err?.message);
    }
  }

  return (
    <div className="container">
      <h1>NFC — Scan / Write</h1>
      <div className="card">
        <p>يعمل على Chrome/Android عبر HTTPS فقط. اضغط زر Scan أو Write.</p>
        <div className="grid">
          <button className="btn" onClick={scan}>Scan</button>
          <button className="btn" onClick={write}>Write URL</button>
        </div>
      </div>
      <div className="card">
        <h3>Log</h3>
        <pre style={{whiteSpace:'pre-wrap'}}>{log.join('\n')}</pre>
      </div>
    </div>
  );
}
