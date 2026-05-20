
import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function POST(req: Request){
  const { userId, kind, details } = await req.json().catch(()=>({}))
  const { rows } = await pool.query('insert into pdpl_dsr (user_id, kind, details) values ($1,$2,$3) returning id',[userId||null, kind||'access', details||null])
  return NextResponse.json({ ok:true, id: rows[0].id })
}
