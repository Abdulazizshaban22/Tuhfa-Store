
import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { payWithTap, payWithHyperPay } from './payments';

export default function App(){
  return (
    <SafeAreaView style={{flex:1, padding:24}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Tuhfa v4.3.1 — Native Payments</Text>
      <View style={{height:16}}/>
      <TouchableOpacity onPress={()=>payWithTap({amount: 100, currency:'SAR', description:'Sample'})} style={{padding:14, backgroundColor:'#111', borderRadius:8}}>
        <Text style={{color:'#fff'}}>Pay with Tap (Apple Pay / mada)</Text>
      </TouchableOpacity>
      <View style={{height:10}}/>
      <TouchableOpacity onPress={()=>payWithHyperPay({amount: 100, currency:'SAR', description:'Sample'})} style={{padding:14, backgroundColor:'#444', borderRadius:8}}>
        <Text style={{color:'#fff'}}>Pay with HyperPay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
