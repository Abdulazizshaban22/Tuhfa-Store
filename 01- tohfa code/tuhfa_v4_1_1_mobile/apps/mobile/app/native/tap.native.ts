
import { NativeModules } from 'react-native';
const { TapBridge } = NativeModules;

export async function tapPayNative(amountSAR:number, desc:string){
  if(!TapBridge) throw new Error('TapBridge native module not linked yet');
  return await TapBridge.pay(amountSAR, desc);
}
