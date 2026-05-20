
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Product({ route, navigation }: any) {
  const { id='TUHFA-0001' } = route.params || {};
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>قطعة — {id}</Text>
      <Text>وصف موجز للقطعة + صور/GLB (يُربط لاحقًا)</Text>
      <Button title="شراء الآن" onPress={()=>navigation.navigate('Checkout', { id })} />
      <Button title="Scan-to-Own (NFC/QR)" onPress={()=>navigation.navigate('ScanNFC', { id })} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, padding:16, gap:12 }, h1:{ fontSize:18, fontWeight:'700' } });
