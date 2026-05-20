
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import '@walletconnect/react-native-compat';
import { initAppKit } from '../wallet/appkit';

export default function Wallet(){
  const [ready,setReady]=React.useState(false);
  React.useEffect(()=>{ initAppKit().then(()=>setReady(true)); },[]);
  return (
    <View style={s.c}>
      <Text style={s.h1}>Reown AppKit — WalletConnect</Text>
      <Text>{ready? 'جاهز' : 'تحميل...'}</Text>
      <Button title="اتصال محفظة (توضيحي)" onPress={()=>Alert.alert('Wallet','سيتم عرض مودال Reown عند التفعيل')} />
    </View>
  );
}
const s = StyleSheet.create({ c:{flex:1,padding:16,gap:12}, h1:{fontSize:18,fontWeight:'700'} });
