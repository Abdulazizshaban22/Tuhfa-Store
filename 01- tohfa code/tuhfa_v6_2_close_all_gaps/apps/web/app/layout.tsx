
import './globals.css'
import Providers from './providers'

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body>
    <header style={{display:'flex',gap:12,padding:'12px 16px',borderBottom:'1px solid #eee'}}>
      <strong>تحفة</strong>
      <a href="/">الرئيسية</a>
      <a href="/wallet">المحافظ</a>
      <a href="/checkout">الدفع</a>
      <a href="/admin/dashboard">اللوحة</a>
      <a href="/map/cultural">الخريطة الثقافية</a>
      <a href="/gallery/3d">عارض 3D</a>
      <div style={{marginInlineStart:'auto'}}><appkit-button /></div>
    </header>
    <Providers>{children}</Providers>
  </body></html>
}
