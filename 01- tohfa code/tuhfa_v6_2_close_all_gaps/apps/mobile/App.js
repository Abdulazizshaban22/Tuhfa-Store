
import { Text, View, Button, Linking } from 'react-native'
export default function App(){
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', gap:12}}>
      <Text>تحفة — Mobile Skeleton</Text>
      <Button title="Open Web Wallet" onPress={()=>Linking.openURL('https://your-domain.com/wallet')} />
    </View>
  )
}
