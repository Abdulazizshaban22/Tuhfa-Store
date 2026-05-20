
import { NextResponse } from 'next/server'
import crypto from 'crypto'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') || 'TUHFA-0001'
  const now = new Date().toISOString()
  const payload:any = {
    '@context':['https://schema.org','https://w3id.org/security/v2'],
    type:['VisualArtwork','ProvenanceRecord'],
    id, title:'تحفة — شهادة أصالة',
    issuer:'Tuhfa Sovereign', issuedAt: now,
    chain:{ network:'polygon-zkevm', contract: process.env.NEXT_PUBLIC_CONTRACT||'0x', tokenId:'1' },
    fixity:{ algorithm:'SHA-256', digest:'pending' }
  }
  payload.fixity.digest = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex')
  return NextResponse.json(payload)
}
