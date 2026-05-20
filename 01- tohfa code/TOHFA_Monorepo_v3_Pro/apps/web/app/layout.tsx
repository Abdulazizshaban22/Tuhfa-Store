import './globals.css'
import { auth, signIn, signOut } from '@/auth'
export const metadata = { title:'تحفة — سوق الحِرف السعودية', description:'منصة تربط المتاحف بالحرفيين' }
export default async function RootLayout({ children }:{ children: React.ReactNode }){
  const session = await auth()
  return (<html lang="ar" dir="rtl"><body>
    <header style={{padding:'1rem',borderBottom:'1px solid #eee',display:'flex',gap:16,justifyContent:'space-between'}}>
      <b>تحفة (TOHFA)</b>
      <nav style={{display:'flex',gap:12}}>
        <a href="/">الرئيسية</a>
        <a href="/b2b">B2B</a>
        <a href="/iiif/demo">IIIF</a>
        <a href="/checkout">الدفع</a>
        {session ? (<form action={async()=>{ 'use server'; await signOut(); }}><button>خروج</button></form>) : (<form action={async()=>{ 'use server'; await signIn(); }}><button>دخول</button></form>)}
      </nav>
    </header><main style={{padding:'1rem'}}>{children}</main></body></html>)
}
