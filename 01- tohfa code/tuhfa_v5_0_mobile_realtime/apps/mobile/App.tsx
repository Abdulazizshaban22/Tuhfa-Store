
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import Checkout from './src/screens/Checkout';
import Wallet from './src/screens/Wallet';
import ScanNFC from './src/screens/ScanNFC';
import Notifications from './src/screens/Notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="ScanNFC" component={ScanNFC} options={{ title: 'NFC — Scan / Write' }} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
