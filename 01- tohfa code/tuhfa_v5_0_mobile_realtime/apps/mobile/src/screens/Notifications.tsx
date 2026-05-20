
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen(){
  async function reg() {
    const { status } = await Notifications.requestPermissionsAsync();
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    Alert.alert('Expo Push Token', token);
  }
  return (
    <View style={styles.c}>
      <Text style={styles.h1}>الإشعارات (Expo FCM/APNs)</Text>
      <Button title="تسجيل واستلام رمز" onPress={reg} />
    </View>
  );
}
const styles = StyleSheet.create({ c:{ flex:1, padding:16, gap:12 }, h1:{ fontSize:18, fontWeight:'700' } });
