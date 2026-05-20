
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
export async function ensureNfc(){ await NfcManager.start(); }
export async function writeText(text: string){
  await NfcManager.requestTechnology(NfcTech.Ndef);
  const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
  if(bytes) await NfcManager.ndefHandler.writeNdefMessage(bytes);
  await NfcManager.cancelTechnologyRequest();
}
