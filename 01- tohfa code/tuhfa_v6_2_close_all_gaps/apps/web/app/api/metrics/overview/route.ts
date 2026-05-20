
import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET(){
  const { rows } = await pool.query('select * from daily_metrics order by day asc')
  const sales = rows.reduce((a,r)=>a+r.sales_count,0)
  const revenue = rows.reduce((a,r)=>a+Number(r.revenue_sar),0)
  const visitors = rows.reduce((a,r)=>a+r.visitors,0)
  return NextResponse.json({ series: rows, totals:{ sales, revenue, visitors } })
}
