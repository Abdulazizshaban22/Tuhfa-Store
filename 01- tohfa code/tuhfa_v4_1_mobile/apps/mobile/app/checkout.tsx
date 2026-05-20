
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Checkout(){
  const url = (process.env.EXPO_PUBLIC_WEB_BASE_URL || 'https://your-web.tuhfa.app') + '/checkout?mobile=1';
  return (
    <View style={{flex:1, backgroundColor:'#0A0A0E'}}>
      <Text style={s.h}>Checkout (Web)</Text>
      <WebView source={{ uri: url }} style={{flex:1}} />
    </View>
  );
}

const s = StyleSheet.create({
  h:{ color:'#E6C878', padding:12, textAlign:'center' }
});
