
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { payWithTap } from './native/TapBridge';
import { payWithHyperPay } from './native/HyperPayBridge';

const MOCK = {
  sku: 'TUHFA-0001',
  title: 'مزهرية سدو نجدي — إصدار محدود',
  price_sar: 450,
  image_url: 'https://images.unsplash.com/photo-1549887534-1541e9323e74?q=80&w=1200&auto=format&fit=crop'
};

export default function Product(){
  const [loading, setLoading] = useState(false);

  async function buyTap(){
    try{
      setLoading(true);
      const j = await payWithTap(MOCK.price_sar, MOCK.title);
      setLoading(false);
      if(j?.redirect_url){ Linking.openURL(j.redirect_url); }
      else Alert.alert('Tap', 'تم تجهيز الطلب. تحقق من الإشعار/الرسائل.');
    }catch(e:any){
      setLoading(false);
      Alert.alert('Tap خطأ', e?.message||'فشل العملية');
    }
  }

  async function buyHyperPay(){
    try{
      setLoading(true);
      const j = await payWithHyperPay(MOCK.price_sar);
      setLoading(false);
      if(j?.redirect_url) Linking.openURL(j.redirect_url);
    }catch(e:any){
      setLoading(false);
      Alert.alert('HyperPay خطأ', e?.message||'فشل العملية');
    }
  }

  return (
    <View style={s.c}>
      <Image source={{uri:MOCK.image_url}} style={s.img} />
      <Text style={s.h1}>{MOCK.title}</Text>
      <Text style={s.price}>{MOCK.price_sar} SAR</Text>
      <Pressable onPress={buyTap} style={s.btn}><Text>شراء عبر Tap (Native)</Text></Pressable>
      <Pressable onPress={buyHyperPay} style={[s.btn,{backgroundColor:'#C9CDD4'}]}><Text>شراء عبر HyperPay (Native)</Text></Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  c:{ flex:1, backgroundColor:'#0A0A0E', padding:16 },
  img:{ width:'100%', height:280, borderRadius:12 },
  h1:{ color:'#E6C878', fontSize:20, fontWeight:'700', marginTop:12 },
  price:{ color:'#C9CDD4', marginVertical:6 },
  btn:{ backgroundColor:'#E6C878', padding:14, borderRadius:10, alignItems:'center', marginTop:10 }
});
