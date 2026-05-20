
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

export default function Wallet(){
  const { open, isConnected, address } = useWalletConnectModal();

  useEffect(()=>{
    if(!isConnected){ open(); }
  }, [isConnected]);

  return (
    <View style={s.c}>
      <Text style={s.h1}>WalletConnect</Text>
      <Text style={s.p}>{isConnected? `Connected: ${address}` : 'جارٍ الاتصال...'}</Text>
      <WalletConnectModal projectId={projectId} providerMetadata={{
        name: 'Tuhfa',
        description: 'Cultural marketplace',
        url: 'https://tuhfa.app',
        icons: ['https://tuhfa.app/icon.png']
      }} />
    </View>
  );
}

const s = StyleSheet.create({
  c:{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#0A0A0E' },
  h1:{ color:'#E6C878', fontSize:22, fontWeight:'700' },
  p:{ color:'#C9CDD4', marginTop:8 }
});
