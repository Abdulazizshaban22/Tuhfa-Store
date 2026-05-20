import { Stack } from "expo-router";
export default function Layout(){
  return <Stack screenOptions={{ headerShadowVisible:false }}>
    <Stack.Screen name="index" options={{ title:"تحفة" }} />
    <Stack.Screen name="products/index" options={{ title:"المنتجات" }} />
    <Stack.Screen name="product/[id]" options={{ title:"المنتج" }} />
    <Stack.Screen name="checkout/index" options={{ title:"الدفع" }} />
    <Stack.Screen name="scan/index" options={{ title:"Scan" }} />
  </Stack>;
}
