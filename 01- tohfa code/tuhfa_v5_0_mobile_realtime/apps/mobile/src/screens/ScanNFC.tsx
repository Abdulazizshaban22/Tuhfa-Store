
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

async function writeNdef(text: string) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
    if (bytes) await NfcManager.ndefHandler.writeNdefMessage(bytes);
    Alert.alert('NFC', 'تمت الكتابة على الوسم.');
  } catch (e) {
    Alert.alert('NFC', 'فشل — تأكد من دعم الجهاز/NFC');
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

async function readNdef() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    Alert.alert('NFC', JSON.stringify(tag?.ndefMessage || 'لا توجد رسالة'));
  } catch (e) {
    Alert.alert('NFC', 'فشل القراءة');
  } finally { NfcManager.cancelTechnologyRequest(); }
}

export default function ScanNFC() {
  React.useEffect(()=>{ NfcManager.start(); }, []);
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>Scan / Write</Text>
      <Button title="قراءة الوسم" onPress={readNdef} />
      <Button title="كتابة نص موقّع (توضيحي)" onPress={()=>writeNdef('TUHFA:DEMO')} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, padding:16, gap:12 }, h1:{ fontSize:18, fontWeight:'700' } });
