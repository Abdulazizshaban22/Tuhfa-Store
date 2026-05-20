
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}))
  const amount = body.amount || '100.00'
  const currency = body.currency || 'SAR'
  const secret = process.env.TAP_SECRET
  const base = process.env.TAP_BASE || 'https://api.tap.company/v2'
  if(!secret) return NextResponse.json({ error:'TAP_SECRET missing' }, { status:400 })
  // NOTE: Replace below with actual intent creation per Tap docs (Apple Pay/mada).
  // Example payload keys: amount, currency, description, customer, source, merchant, redirect/callback URLs.
  return NextResponse.json({ ok:true, provider:'tap', intent:'placeholder', amount, currency, base })
}
