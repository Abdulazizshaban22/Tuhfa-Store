
'use client'
import React, {useEffect, useState} from 'react';

type Role = 'museum_admin'|'curator'|'researcher'|'auditor';
const tabs = ['assets','users','pdpl','reports'] as const;
export default function Portal(){
  const [active, setActive] = useState<typeof tabs[number]>('assets');
  const [role, setRole] = useState<Role>('museum_admin');
  return (
    <main style={{padding:24}}>
      <h1>Institutional Portal — بوابة المؤسسات والمتاحف</h1>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <label>الدور الحالي:
          <select value={role} onChange={e=>setRole(e.target.value as Role)} style={{marginInlineStart:8}}>
            <option value="museum_admin">مدير متحف</option>
            <option value="curator">قيّم</option>
            <option value="researcher">باحث</option>
            <option value="auditor">مدقّق</option>
          </select>
        </label>
        <nav style={{display:'flex', gap:8, marginInlineStart:16}}>
          {tabs.map(t => <button key={t} onClick={()=>setActive(t)}>{t}</button>)}
        </nav>
      </div>
      <section style={{marginTop:16, border:'1px solid #ddd', borderRadius:8, padding:16}}>
        {active==='assets' && <Assets/>}
        {active==='users' && <Users/>}
        {active==='pdpl' && <PDPL/>}
        {active==='reports' && <Reports/>}
      </section>
    </main>
  );
}

function Assets(){
  return (<div>
    <h2>الأصول المتحفية (IIIF/Schema.org)</h2>
    <ul>
      <li>استعراض المقتنيات، تفعيل IIIF Manifest، تصنيف Schema.org</li>
      <li>رفع صور ووثائق وصوتيات مع وسم الحقوق وسلاسل الملكية</li>
      <li>ربط القطع ببطاقات NFC وشهادات JSON-LD</li>
    </ul>
  </div>);
}

function Users(){
  return (<div>
    <h2>المستخدمون والأدوار (RBAC)</h2>
    <ul>
      <li>مدير متحف / قيّم / باحث / مدقّق</li>
      <li>صلاحيات دقيقة (Least-Privilege) على الموارد</li>
    </ul>
  </div>);
}

function PDPL(){
  return (<div>
    <h2>تقارير PDPL</h2>
    <ul>
      <li>طلبات النفاذ/التصحيح/الحذف (DSR)</li>
      <li>سجل أنشطة المعالجة + ضوابط الأمن السيبراني السحابية</li>
      <li>تشفير البيانات (AES-256) وإدارة مفاتيح عبر KMS</li>
    </ul>
    <a href="/api/sovereign/pdpl/export" target="_blank">توليد تقرير PDPL (JSON)</a>
  </div>);
}

function Reports(){
  return (<div>
    <h2>تقارير الأداء</h2>
    <ul>
      <li>حضور/تفاعل المعارض</li>
      <li>أداء المقتنيات الرقمية والزيارات</li>
      <li>مؤشرات الطلب الثقافي</li>
    </ul>
  </div>);
}
