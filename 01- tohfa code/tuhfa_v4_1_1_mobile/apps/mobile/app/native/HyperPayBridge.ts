
// HyperPayBridge.ts — placeholder. Real native bindings to be implemented in iOS/Android using OPPWAMobile SDK.
export async function payWithHyperPay(amountSAR:number, checkoutId?:string){
  // If you have a checkoutId from your backend, launch native UI; otherwise fallback to hosted.
  const url = (process.env.EXPO_PUBLIC_WEB_BASE_URL || 'https://your-web.tuhfa.app') + '/checkout?mobile=1';
  return { redirect_url: url };
}
