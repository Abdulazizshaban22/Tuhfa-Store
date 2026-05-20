import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { createCheckout, getProduct } from "../../lib/api";

export default function Checkout(){
  const { id } = useLocalSearchParams<{id:string}>();
  const [url,setUrl] = useState<string | null>(null);
  const [err,setErr] = useState<string | null>(null);

  useEffect(()=>{
    (async ()=>{
      try{
        const p = await getProduct(id!);
        const ch = await createCheckout(Number(p.priceSar||0), { externalId: id, title: p.title });
        setUrl(ch.transactionUrl);
      }catch(e:any){ setErr(String(e)); }
    })();
  },[id]);

  if(err) return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}><Text>{err}</Text></View>;
  if(!url) return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}><Text>Preparing checkout…</Text></View>;
  return <WebView source={{ uri: url }} style={{ flex:1 }} />
}
