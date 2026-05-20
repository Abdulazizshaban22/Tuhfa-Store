
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}))
  const amount = body.amount || '100.00'
  const currency = body.currency || 'SAR'
  const entity = process.env.HYPERPAY_ENTITY_ID
  const token = process.env.HYPERPAY_AUTH_TOKEN
  const base = process.env.HYPERPAY_BASE || 'https://eu-prod.oppwa.com'
  if(!entity || !token) return NextResponse.json({ error:'HYPERPAY credentials missing' }, { status:400 })
  // NOTE: Replace below with actual /v1/checkouts call; include entityId, amount, currency, paymentType, etc.
  return NextResponse.json({ ok:true, provider:'hyperpay', checkoutId:'placeholder', amount, currency, base })
}
