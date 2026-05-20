
import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';

export async function initPush(){
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if(enabled){
    const token = await messaging().getToken();
    console.log('FCM token:', token);
  }
  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('FCM (fg):', remoteMessage?.notification?.title);
  });
}

// Background handler (index.js must import this file)
export const registerBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('FCM (bg):', remoteMessage?.messageId);
  });
};
