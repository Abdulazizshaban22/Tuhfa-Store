
import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if(!url) return NextResponse.json({ error:'url required' }, { status: 400 })
  // In production parse GLB header and JSON chunk, then read extensions.KHR_xmp_json_ld
  return NextResponse.json({ url, xmp:{ note:'ضع تفريغ XMP (KHR_xmp_json_ld) هنا بعد تنفيذ بايبلاين التضمين.' } })
}
