import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export async function readOnce(){
  await NfcManager.start();
  try{
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag;
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}