
// analytics.ts — GA4 (RNFirebase) + Mixpanel bootstrap
import analytics from '@react-native-firebase/analytics';
import { Mixpanel } from 'mixpanel-react-native';

let mixpanel: Mixpanel | null = null;

export function initAnalytics(mixpanelToken?: string){
  if(mixpanelToken){
    mixpanel = new Mixpanel(mixpanelToken);
    mixpanel.init();
  }
}

export async function track(event: string, params?: Record<string, any>){
  await analytics().logEvent(event, params);
  if(mixpanel){ mixpanel.track(event, params || {}); }
}
