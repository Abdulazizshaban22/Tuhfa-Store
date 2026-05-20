
import { NativeModules } from 'react-native';
const { HyperPayBridge } = NativeModules;

export async function hyperPayStart(checkoutId:string){
  if(!HyperPayBridge) throw new Error('HyperPayBridge native module not linked yet');
  return await HyperPayBridge.start(checkoutId);
}
