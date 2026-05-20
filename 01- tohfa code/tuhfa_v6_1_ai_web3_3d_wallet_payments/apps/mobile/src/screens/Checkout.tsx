
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
export default function Checkout(){
  return (<View style={s.c}>
    <Text style={s.h1}>الدفع — Apple Pay/mada عبر Tap/HyperPay (لاحقًا)</Text>
    <Button title="ادفع (Demo)" onPress={()=>Alert.alert('Demo','اربط Tap/HyperPay Native SDKs في v6.2')} />
  </View>);
}
const s = StyleSheet.create({ c:{flex:1,padding:16,gap:12}, h1:{fontSize:18,fontWeight:'700'} });
