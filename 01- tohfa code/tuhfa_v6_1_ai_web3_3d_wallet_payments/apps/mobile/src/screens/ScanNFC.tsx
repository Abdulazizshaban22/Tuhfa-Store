
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
export default function ScanNFC(){
  React.useEffect(()=>{ NfcManager.start(); },[]);
  async function read(){ try{ await NfcManager.requestTechnology(NfcTech.Ndef); const tag = await NfcManager.getTag(); Alert.alert('NFC', JSON.stringify(tag?.ndefMessage||'لا توجد رسالة')); }catch(e){ Alert.alert('NFC','فشل القراءة'); }finally{ NfcManager.cancelTechnologyRequest(); } }
  async function write(){ try{ await NfcManager.requestTechnology(NfcTech.Ndef); const bytes = Ndef.encodeMessage([Ndef.textRecord('tuhfa://token/1')]); if(bytes) await NfcManager.ndefHandler.writeNdefMessage(bytes); Alert.alert('NFC','تمت الكتابة'); }catch(e){ Alert.alert('NFC','فشل الكتابة'); }finally{ NfcManager.cancelTechnologyRequest(); } }
  return (<View style={s.c}><Text style={s.h1}>NFC — Scan / Write</Text><Button title="قراءة" onPress={read} /><Button title="كتابة tokenURI" onPress={write} /></View>);
}
const s = StyleSheet.create({ c:{flex:1,padding:16,gap:12}, h1:{fontSize:18,fontWeight:'700'} });
