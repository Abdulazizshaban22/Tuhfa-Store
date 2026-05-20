'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function SellerHome(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ fetch(`${API}/api/products`).then(r=>r.json()).then(setProducts)},[]);
  return (
    <div>
      <h2>لوحة البائع/المتحف</h2>
      <p>إدارة المنتجات، العروض، الكوبونات، والباقات.</p>
      <h3>منتجات حديثة</h3>
      <ul>{products.map(p=>(<li key={p.id}>{p.title} — {p.price} {p.currency}</li>))}</ul>
    </div>
  );
}