
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initAnalytics } from './analytics';
import { initPush } from './notifications';

import { useEffect } from 'react';
import { initAnalytics, track } from './analytics';
export default function Layout(){
  useEffect(()=>{ initAnalytics(process.env.EXPO_PUBLIC_MIXPANEL_TOKEN); track('app_open'); }, []); useEffect(()=>{ initAnalytics(process.env.EXPO_PUBLIC_MIXPANEL_TOKEN); initPush(); }, []);
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerStyle:{ backgroundColor:'#0A0A0E' }, headerTintColor:'#E6C878' }} />
    </>
  );
}
