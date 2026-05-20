export const metadata = { title: 'TOHFA', description: 'Cultural Crafts & Museums' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto'}}>{children}</body>
    </html>
  );
}
