import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import { listProducts } from "../../lib/api";
export default function Products(){
  const [data,setData] = useState<any[]>([]);
  const [q,setQ] = useState('');
  async function load(){ const res = await listProducts(q?{ q }:{}); setData(res.data||[]); }
  useEffect(()=>{ load(); },[]);
  return <View style={{ flex:1, padding:16, gap:12 }}>
    <Text style={{ fontSize:20, fontWeight:"700" }}>المنتجات</Text>
    <View style={{ flexDirection:"row", gap:8 }}>
      <TextInput placeholder="ابحث..." value={q} onChangeText={setQ} style={{ flex:1, borderWidth:1, borderColor:"#ccc", padding:8, borderRadius:8 }} />
      <Pressable onPress={load} style={{ backgroundColor:"#0a7", paddingHorizontal:16, justifyContent:"center", borderRadius:8 }}>
        <Text style={{ color:"#fff" }}>بحث</Text>
      </Pressable>
    </View>
    <FlatList
      data={data}
      keyExtractor={(item)=> String(item.id)}
      renderItem={({item})=> <Link href={`/product/${item.externalId}`} asChild>
        <Pressable style={{ flexDirection:"row", gap:12, paddingVertical:12, borderBottomWidth:1, borderColor:"#eee" }}>
          <Image source={{ uri: item.imageUrl }} style={{ width:72, height:72, borderRadius:8 }} />
          <View style={{ flex:1 }}>
            <Text style={{ fontWeight:"700" }}>{item.title}</Text>
            <Text numberOfLines={2} style={{ color:"#333" }}>{item.description}</Text>
            <Text style={{ color:"#666", marginTop:4 }}>{Number(item.priceSar).toFixed(2)} SAR</Text>
          </View>
        </Pressable>
      </Link>}
    />
  </View>
}
