
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';

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
      const r = await fetch(process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-api.tuhfa.app' + '/api/payments/tap/create', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({ amount: MOCK.price_sar, method:'applepay' })
      });
      const j = await r.json();
      setLoading(false);
      if(j.redirect_url){ Linking.openURL(j.redirect_url); }
      else Alert.alert('الدفع', 'تعذّر إنشاء عملية الدفع');
    }catch(e:any){
      setLoading(false);
      Alert.alert('خطأ', e?.message||'فشل العملية');
    }
  }

  return (
    <View style={s.c}>
      <Image source={{uri:MOCK.image_url}} style={s.img} />
      <Text style={s.h1}>{MOCK.title}</Text>
      <Text style={s.price}>{MOCK.price_sar} SAR</Text>
      <Pressable onPress={buyTap} style={s.btn}>
        <Text>شراء عبر Tap (Apple Pay/Mada)</Text>
      </Pressable>
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
