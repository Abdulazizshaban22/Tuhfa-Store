
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || 'TUHFA-0001';
  const now = new Date().toISOString();
  const payload:any = {
    '@context': ['https://schema.org','https://w3id.org/security/v2'],
    type: ['VisualArtwork','ProvenanceRecord'],
    id, title:'سدو نجدي — أصلية',
    issuer:'Tuhfa Sovereign', issuedAt:now,
    chain: { network:'polygon-zkevm', contract:process.env.NEXT_PUBLIC_CONTRACT || '0xContract', tokenId:'1' },
    media: { glb:'https://cdn.tuhfa.sa/assets/asset1.glb#xmp' },
    fixity: { algorithm:'SHA-256', digest:'demo' }
  };
  const digest = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  payload.fixity.digest = digest;
  return NextResponse.json(payload);
}
