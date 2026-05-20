import './globals.css';
import { auth, signIn, signOut } from '@/auth';

export const metadata = { title: 'تحفة — سوق الحِرف السعودية', description: 'منصة تربط المتاحف بالحرفيين' };
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header style={{padding:'1rem',borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between'}}>
          <b>تحفة (TOHFA)</b>
          <nav>
            <a href="/checkout" style={{marginInline:8}}>الدفع</a>
            {session ? (
              <form action={async () => { 'use server'; await signOut(); }}><button>تسجيل الخروج</button></form>
            ) : (
              <form action={async () => { 'use server'; await signIn(); }}><button>تسجيل الدخول</button></form>
            )}
          </nav>
        </header>
        <main style={{padding:'1rem'}}>{children}</main>
      </body>
    </html>
  );
}
