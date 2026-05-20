
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Wallet from './src/screens/Wallet';
import ScanNFC from './src/screens/ScanNFC';
import Checkout from './src/screens/Checkout';
const Stack = createNativeStackNavigator();
export default function App(){
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="ScanNFC" component={ScanNFC} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  </NavigationContainer>);
}
