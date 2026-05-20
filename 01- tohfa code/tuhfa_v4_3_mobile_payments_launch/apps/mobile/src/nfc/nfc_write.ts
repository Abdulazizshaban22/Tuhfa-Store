
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export async function writeCertUrl(url: string){
  await NfcManager.start();
  try{
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
    if(bytes) await NfcManager.ndefHandler.writeNdefMessage(bytes);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}
