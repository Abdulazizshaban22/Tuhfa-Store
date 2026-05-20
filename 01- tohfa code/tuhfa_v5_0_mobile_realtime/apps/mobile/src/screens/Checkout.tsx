
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

/**
 * Note: This is a placeholder checkout UI.
 * For production enable native SDKs (Tap/HyperPay) and Apple Pay / mada.
 */
export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>الدفع — نموذج توضيحي</Text>
      <TextInput style={styles.in} placeholder="الاسم" value={name} onChangeText={setName} />
      <TextInput style={styles.in} placeholder="الإيميل" value={email} onChangeText={setEmail} />
      <Button title="ادفع (Sandbox)" onPress={()=>Alert.alert('Sandbox', 'استخدم جسر Tap/HyperPay الأصلي في v5.1')} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, padding:16, gap:12 }, h1:{ fontSize:18, fontWeight:'700' }, in:{ borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10 } });
