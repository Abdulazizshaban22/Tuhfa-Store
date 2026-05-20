
type CheckoutInput = { amount: number; currency: 'SAR'|'USD'|'AED'; brand?: 'APPLEPAY'|'MADA'|'VISA'|'MASTERCARD' };
/**
 * Placeholder function. In v4.3, implement native bridges:
 * - Tap iOS/Android SDK (Apple Pay + Mada)
 * - HyperPay iOS/Android SDK (OPPWA) as alternative
 */
export async function startCheckout(input: CheckoutInput){
  console.log('Start checkout (placeholder):', input);
  alert('Checkout placeholder — integrate Tap/HyperPay native SDKs.');
}
