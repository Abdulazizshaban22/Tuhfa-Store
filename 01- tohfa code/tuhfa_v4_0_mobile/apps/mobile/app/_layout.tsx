
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout(){
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerStyle:{ backgroundColor:'#0A0A0E' }, headerTintColor:'#E6C878' }} />
    </>
  );
}
