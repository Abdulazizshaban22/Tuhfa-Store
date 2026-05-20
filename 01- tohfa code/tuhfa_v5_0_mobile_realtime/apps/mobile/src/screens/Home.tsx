
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>تحفة — v5.0</Text>
      <Button title="عرض قطعة" onPress={()=>navigation.navigate('Product', { id: 'TUHFA-0001' })} />
      <Button title="الدفع / Checkout" onPress={()=>navigation.navigate('Checkout')} />
      <Button title="المحفظة / Wallet" onPress={()=>navigation.navigate('Wallet')} />
      <Button title="NFC — Scan / Write" onPress={()=>navigation.navigate('ScanNFC')} />
      <Button title="الإشعارات" onPress={()=>navigation.navigate('Notifications')} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, alignItems:'center', justifyContent:'center', gap:12 }, h1:{ fontSize:22, fontWeight:'700' } });
