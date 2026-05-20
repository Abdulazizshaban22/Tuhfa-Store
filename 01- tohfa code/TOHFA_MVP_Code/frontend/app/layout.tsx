import './globals.css';

export const metadata = {
  title: 'TOHFA — سوق الحِرف السعودية',
  description: 'منصة تحفة — تربط المتاحف بالحرفيين',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto'}}>
        <header style={{padding:'1rem', borderBottom:'1px solid #eee'}}>
          <b>تحفة (TOHFA)</b> — سوق الحِرف السعودية
        </header>
        <main style={{padding:'1rem'}}>{children}</main>
      </body>
    </html>
  );
}
