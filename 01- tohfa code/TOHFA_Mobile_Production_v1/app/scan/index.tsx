import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { View, Text } from "react-native";
export default function Scan(){
  const [permission, requestPermission] = useCameraPermissions();
  const [value,setValue] = useState<string>("");
  if(!permission?.granted){
    return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
      <Text>نحتاج إذن الكاميرا</Text>
      <Text onPress={()=>requestPermission?.()}>منح الإذن</Text>
    </View>
  }
  return <View style={{ flex:1 }}>
    <CameraView
      style={{ flex:1 }}
      onBarcodeScanned={(res)=> setValue(res?.data || "")}
    />
    <View style={{ position:"absolute", bottom:20, left:0, right:0, alignItems:"center" }}>
      <Text style={{ backgroundColor:"rgba(0,0,0,0.6)", color:"#fff", padding:8, borderRadius:8 }}>{value || "وجّه الكاميرا على QR"}</Text>
    </View>
  </View>
}
