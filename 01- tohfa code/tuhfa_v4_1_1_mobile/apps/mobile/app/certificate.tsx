
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function Certificate(){
  const [tokenId, setTokenId] = useState<number>(1);
  const base = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-api.tuhfa.app';

  async function open(){
    const url = base + '/certificate/' + tokenId;
    Alert.alert('الشهادة', 'افتح الشهادة على الويب: ' + url);
  }

  return (
    <View style={s.c}>
      <Text style={s.h1}>شهادة الملكية</Text>
      <Pressable onPress={open} style={s.btn}><Text>فتح الشهادة</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1, backgroundColor:'#0A0A0E', alignItems:'center', justifyContent:'center' },
  h1:{ color:'#E6C878', fontSize:22, fontWeight:'700' },
  btn:{ marginTop:14, backgroundColor:'#E6C878', padding:14, borderRadius:10 }
});
