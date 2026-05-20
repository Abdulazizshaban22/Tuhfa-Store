
'use client';
import React from 'react';

export default function Dashboard(){
  return (
    <main style={{padding:24}} dir="rtl">
      <h2>لوحة القيادة — نظرة سريعة</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(0,1fr))',gap:16}}>
        <section style={{border:'1px solid #ddd', borderRadius:12, padding:16}}>
          <h3>المبيعات اليوم</h3>
          <p>— قيد الربط بقاعدة البيانات</p>
        </section>
        <section style={{border:'1px solid #ddd', borderRadius:12, padding:16}}>
          <h3>الزوار والتفاعل</h3>
          <p>— بث فوري من Realtime API</p>
        </section>
        <section style={{gridColumn:'1 / span 2', border:'1px solid #ddd', borderRadius:12, padding:16}}>
          <h3>توصيات الذكاء للقطع</h3>
          <ul>
            <li>“سدو نجدي” — عرض 3 قطع مشابهة</li>
            <li>“خزف حجازي” — عرض 2 قطع رائجة</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
