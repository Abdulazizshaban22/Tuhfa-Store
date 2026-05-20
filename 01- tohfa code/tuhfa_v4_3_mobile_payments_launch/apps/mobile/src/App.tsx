
import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Linking } from 'react-native';
import { writeCertUrl } from './nfc/nfc_write';
import { startCheckout } from './payments/checkout';

export default function App(){
  return (
    <SafeAreaView style={{flex:1, padding:24}}>
      <Text style={{fontSize:22, fontWeight:'600'}}>Tuhfa — v4.3 (Mobile & Payments Launch)</Text>
      <View style={{height:16}}/>
      <TouchableOpacity onPress={()=>startCheckout({amount: 10_00, currency:'SAR'})} style={{padding:16, backgroundColor:'#111', borderRadius:8}}>
        <Text style={{color:'#fff'}}>Checkout (Tap/HyperPay placeholder)</Text>
      </TouchableOpacity>
      <View style={{height:12}}/>
      <TouchableOpacity onPress={()=>writeCertUrl('https://tuhfa.app/cert/1')} style={{padding:16, backgroundColor:'#444', borderRadius:8}}>
        <Text style={{color:'#fff'}}>Write NFC: Certificate URL</Text>
      </TouchableOpacity>
      <View style={{height:12}}/>
      <TouchableOpacity onPress={()=>Linking.openURL('https://tuhfa.app')}>
        <Text style={{color:'#0a7'}}>Open Web</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
