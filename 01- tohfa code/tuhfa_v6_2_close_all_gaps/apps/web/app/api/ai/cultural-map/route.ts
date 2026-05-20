
import { NextResponse } from 'next/server'
export async function GET(){
  return NextResponse.json([
    { lat:24.7136, lon:46.6753, label:'الرياض — طلبات: 42' },
    { lat:21.3891, lon:39.8579, label:'جدة — طلبات: 31' },
    { lat:26.4207, lon:50.0888, label:'الدمام — طلبات: 12' }
  ])
}
