
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Home(){
  return (
    <View style={s.c}>
      <Text style={s.h1}>تحفة — Mobile v4.0</Text>
      <Text style={s.p}>سوق ذكي للحرف والمتاحف — شراء، NFT، NFC، معارض 3D.</Text>
      <View style={{height:16}}/>
      <Link href="/product" style={s.btn}>منتج</Link>
      <Link href="/checkout" style={s.btn}>الدفع</Link>
      <Link href="/wallet" style={s.btn}>المحفظة</Link>
      <Link href="/nfc" style={s.btn}>NFC</Link>
      <Link href="/certificate" style={s.btn}>الشهادة</Link>
      <Link href="/museum" style={s.btn}>معرض 3D</Link>
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1, backgroundColor:'#0A0A0E', alignItems:'center', justifyContent:'center', padding:24 },
  h1:{ color:'#E6C878', fontSize:24, fontWeight:'700' },
  p:{ color:'#C9CDD4', marginTop:8, textAlign:'center' },
  btn:{ color:'#0A0A0E', backgroundColor:'#E6C878', paddingVertical:12, paddingHorizontal:18, borderRadius:10, marginTop:10, overflow:'hidden' }
});
