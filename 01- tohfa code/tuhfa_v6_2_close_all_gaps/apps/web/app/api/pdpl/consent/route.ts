
import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function POST(req: Request){
  const { userId, purpose, granted, ip, userAgent } = await req.json().catch(()=>({}))
  await pool.query('insert into pdpl_consent (user_id, purpose, granted, ip, user_agent) values ($1,$2,$3,$4,$5)',
    [userId||null, purpose||'analytics', !!granted, ip||null, userAgent||null])
  return NextResponse.json({ ok:true })
}
