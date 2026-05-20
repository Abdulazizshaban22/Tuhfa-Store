
// TapBridge.ts — placeholder. Real native bindings to be implemented in iOS/Android using goSell SDK.
export async function payWithTap(amountSAR:number, desc:string){
  // TODO: bridge to native Tap SDK (goSell). For now fallback to backend redirect.
  const url = (process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-api.tuhfa.app') + '/api/payments/tap/create';
  const r = await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ amount: amountSAR, method:'applepay' }) });
  const j = await r.json();
  return j;
}
