
export default function RootLayout({ children }:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body style={{fontFamily:'system-ui',background:'#fff'}}>
    <header style={{padding:'12px 24px',borderBottom:'1px solid #eee',position:'sticky',top:0,background:'#fff',zIndex:10}}>
      <nav style={{display:'flex',gap:16}}>
        <a href="/">الرئيسية</a>
        <a href="/wallet">المحفظة</a>
        <a href="/checkout">الدفع</a>
        <a href="/gallery/3d">3D</a>
        <a href="/admin/dashboard">لوحة القيادة</a>
        <a href="/policies/pdpl">سياسة الخصوصية</a>
        <a href="/policies/refund">سياسة الاسترجاع</a>
      </nav>
    </header>
    {children}
  </body></html>;
}
