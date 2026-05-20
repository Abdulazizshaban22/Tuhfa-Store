
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

export default function NFCPage(){
  const [supported, setSupported] = useState<boolean|null>(null);
  const [enabled, setEnabled] = useState<boolean|null>(null);
  const [payload, setPayload] = useState<string>('https://tuhfa.app/certificate/1');

  useEffect(()=>{
    (async ()=>{
      const sup = await NfcManager.isSupported();
      setSupported(sup);
      if(sup){
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
    })();
  }, []);

  const write = useCallback(async ()=>{
    try{
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(payload)]);
      await NfcManager.requestTechnology(NfcManager.Tech.Ndef, { alertMessage:'قرب الوسم لكتابة الرابط' });
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      Alert.alert('تم', 'تمت الكتابة بنجاح');
    }catch(e:any){
      Alert.alert('خطأ', e?.message||'فشل الكتابة');
    }finally{
      NfcManager.cancelTechnologyRequest();
    }
  }, [payload]);

  return (
    <View style={s.c}>
      <Text style={s.h1}>NFC — Scan to Own</Text>
      <Text style={s.p}>مدعوم: {String(supported)} | مفعل: {String(enabled)}</Text>
      <Pressable onPress={write} style={s.btn}><Text>اكتب رابط الشهادة على الوسم</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1, backgroundColor:'#0A0A0E', alignItems:'center', justifyContent:'center' },
  h1:{ color:'#E6C878', fontSize:22, fontWeight:'700' },
  p:{ color:'#C9CDD4', marginTop:8 },
  btn:{ marginTop:14, backgroundColor:'#E6C878', padding:14, borderRadius:10 }
});
