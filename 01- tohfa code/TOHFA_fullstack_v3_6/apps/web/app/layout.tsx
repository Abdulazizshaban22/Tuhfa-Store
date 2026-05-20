
export const metadata = { title: 'تحفة — TOHFA', description: 'Crafts & Museums Marketplace' };
export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (<html lang="ar" dir="rtl"><body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto'}}>{children}</body></html>);
}
