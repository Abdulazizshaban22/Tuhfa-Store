import { Link } from "expo-router";
import { View, Text } from "react-native";
export default function Home(){
  return <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap:16, padding:24 }}>
    <Text style={{ fontSize:24, fontWeight:"700" }}>تحفة — التطبيق الذكي</Text>
    <Link href="/products">تصفح المنتجات</Link>
    <Link href="/scan">مسح QR</Link>
  </View>
}
