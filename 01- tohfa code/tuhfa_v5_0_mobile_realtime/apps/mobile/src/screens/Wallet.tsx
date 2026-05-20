
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { initAppKit } from '../wallet/appkit';

export default function Wallet() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(()=>{ initAppKit().then(()=>setReady(true)); }, []);
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>المحفظة — WalletConnect / Reown</Text>
      <Text>{ready ? 'جاهز للاتصال بمحفظة' : 'تحميل AppKit...'}</Text>
      <Button title="اتصال محفظة (توضيحي)" onPress={()=>{}} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, padding:16, gap:12 }, h1:{ fontSize:18, fontWeight:'700' } });
