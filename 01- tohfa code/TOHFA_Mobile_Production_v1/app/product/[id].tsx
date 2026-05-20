import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { getProduct, getOwner } from "../../lib/api";

export default function Product(){
  const { id } = useLocalSearchParams<{id:string}>();
  const [p,setP] = useState<any>(null);
  const [owner,setOwner] = useState<any>(null);
  useEffect(()=>{
    (async ()=>{
      const pr = await getProduct(id!); setP(pr);
      const ow = await getOwner(id!); setOwner(ow);
    })();
  },[id]);
  if(!p) return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}><Text>...</Text></View>;
  return <View style={{ flex:1, padding:16, gap:12 }}>
    <Image source={{ uri: p.imageUrl }} style={{ width:"100%", height:280, borderRadius:12 }} />
    <Text style={{ fontSize:22, fontWeight:"800" }}>{p.title}</Text>
    <Text style={{ color:"#333" }}>{p.description}</Text>
    <Text style={{ color:"#0a7", fontWeight:"700" }}>{Number(p.priceSar).toFixed(2)} SAR</Text>
    <View style={{ padding:12, backgroundColor:"#f7f7f7", borderRadius:10 }}>
      <Text style={{ fontWeight:"700", marginBottom:6 }}>الملكية الرقمية (NFT)</Text>
      {owner?.exists ? <Text>المالك: {owner.owner} — Token #{owner.tokenId}</Text> : <Text>لا توجد شهادة بعد.</Text>}
    </View>
    <Link href={{ pathname:"/checkout", params:{ id } }} asChild>
      <Pressable style={{ backgroundColor:"#111", padding:14, borderRadius:10, alignItems:"center" }}>
        <Text style={{ color:"#fff", fontWeight:"700" }}>اشترِ الآن</Text>
      </Pressable>
    </Link>
  </View>
}
