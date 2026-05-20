
'use client';
import React from 'react';
export default function DemoCheckout(){
  return (
    <main dir="rtl" style={{padding:24, maxWidth:640}}>
      <h2>الدفع (Demo)</h2>
      <p>هذه صفحة توضيحية. لتمكين Apple Pay/mada فعليًا اربط Tap/HyperPay في /api/payments/*</p>
      <form onSubmit={e=>{e.preventDefault(); alert('Demo — اربط مزود الدفع لاحقًا');}}>
        <label>الاسم</label><input style={{display:'block',width:'100%',marginBottom:12}} />
        <label>الإيميل</label><input style={{display:'block',width:'100%',marginBottom:12}} />
        <button>ادفع الآن</button>
      </form>
    </main>
  );
}
