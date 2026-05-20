import { NextResponse } from 'next/server'

export async function GET(){
  const now = Date.now()
  const day = 24*60*60*1000
  const series = Array.from({length:14}).map((_,i)=> ({
    t: new Date(now - (13-i)*day).toISOString().slice(0,10),
    sales: Math.round(Math.random()*50)+20,
    visitors: Math.round(Math.random()*300)+100
  }))
  return NextResponse.json(series)
}
