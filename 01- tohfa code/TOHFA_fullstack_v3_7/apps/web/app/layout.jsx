'use client'
import Providers from './providers/providers'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function ConnectButton(){
  const { address, isConnected } = useAccount()
  const { connectors, connect, status } = useConnect()
  const { disconnect } = useDisconnect()
  if (isConnected) {
    return (<span>متصل: {address?.slice(0,6)}… <button onClick={()=>disconnect()}>قطع</button></span>)
  }
  return (
    <span>
      {connectors.map(c => (<button key={c.uid} onClick={()=>connect({ connector: c })}>اتصال محفظة ({c.name})</button>))}
      <small style={{opacity:.7, marginInlineStart:8}}>{status}</small>
    </span>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{fontFamily:'system-ui', background:'#0b0b0b', color:'#eee'}}>
        <Providers>
          <div style={{maxWidth:1100, margin:'0 auto', padding:'24px'}}>
            <h1>تحفة — v3.7</h1>
            <nav style={{display:'flex', gap:16, alignItems:'center'}}>
              <a href="/">الرئيسية</a>
              <a href="/seller">لوحة البائع</a>
              <a href="/checkout">الدفع</a>
              <a href="/nfc">NFC</a>
              <span style={{marginInlineStart:'auto'}}><ConnectButton/></span>
            </nav>
            <hr/>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}