
'use client'
import React, {useEffect, useState} from 'react';

type Post = { id:number; user:string; content:string; media?:string; createdAt:string };
export default function SocialFeed(){
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  useEffect(()=>{ fetch('/api/social/feed').then(r=>r.json()).then(setPosts); },[]);
  async function publish(){
    const res = await fetch('/api/social/post',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({content})});
    const data = await res.json();
    setPosts([data, ...posts]); setContent('');
  }
  return (
    <main style={{padding:24,maxWidth:860,margin:'0 auto'}}>
      <h1>Craft Social — القصص والمنشورات</h1>
      <div style={{display:'flex',gap:8}}>
        <input value={content} onChange={e=>setContent(e.target.value)} placeholder="اكتب قصة/منشور للحرفة..." style={{flex:1,padding:12}} />
        <button onClick={publish}>نشر</button>
      </div>
      <div style={{height:16}}/>
      {posts.map(p=>(
        <article key={p.id} style={{border:'1px solid #ddd',padding:16,borderRadius:8,marginBottom:12}}>
          <div style={{fontSize:14,color:'#666'}}>@{p.user} · {new Date(p.createdAt).toLocaleString()}</div>
          <div style={{height:6}}/>
          <p style={{fontSize:18,lineHeight:1.5}}>{p.content}</p>
          {p.media && <img src={p.media} alt="" style={{maxWidth:'100%',borderRadius:8,marginTop:8}}/>}
        </article>
      ))}
    </main>
  );
}
