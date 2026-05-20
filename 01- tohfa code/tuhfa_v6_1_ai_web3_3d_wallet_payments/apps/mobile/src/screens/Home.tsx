
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
export default function Home({ navigation }: any){
  return (
    <View style={s.c}>
      <Text style={s.h1}>تحفة — v6.1</Text>
      <Button title="المحفظة" onPress={()=>navigation.navigate('Wallet')} />
      <Button title="NFC — Scan / Write" onPress={()=>navigation.navigate('ScanNFC')} />
      <Button title="الدفع" onPress={()=>navigation.navigate('Checkout')} />
    </View>
  );
}
const s = StyleSheet.create({ c:{flex:1,alignItems:'center',justifyContent:'center',gap:12}, h1:{fontSize:22,fontWeight:'700'} });
