
import { NativeModules } from 'react-native';
const { TuhfaTap, TuhfaHyperPay } = NativeModules as any;

type PayInput = { amount: number; currency: 'SAR'|'USD'|'AED'; description?: string; orderId?: string };
export async function payWithTap(input: PayInput){
  if(!TuhfaTap) throw new Error('Native module TuhfaTap not linked');
  return TuhfaTap.startPayment(input);
}
export async function payWithHyperPay(input: PayInput){
  if(!TuhfaHyperPay) throw new Error('Native module TuhfaHyperPay not linked');
  return TuhfaHyperPay.startPayment(input);
}
