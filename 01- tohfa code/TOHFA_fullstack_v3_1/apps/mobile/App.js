import React from 'react';
import { View, Text, Button, SafeAreaView, Linking } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>تحفة — تطبيق الجوال</Text>
      <Text style={{marginTop:6}}>لوحات: Mint / PDPL / بث حي.</Text>
      <Button title="افتح لوحة الويب" onPress={()=> Linking.openURL('http://localhost:3000')} />
    </SafeAreaView>
  );
}
