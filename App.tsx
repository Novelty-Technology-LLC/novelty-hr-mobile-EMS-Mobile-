import React, { useEffect } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import RootNavigation from './src/app/navigations';
import { globalStyle as style } from './src/assets/styles';
import messaging from '@react-native-firebase/messaging';
import { SetLocalNotification } from './src/app/utils/pushNotification';

const App = (props: any) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        Platform.OS === 'ios' &&
          SetLocalNotification(remoteMessage.notification.body);
      }
    });
    return unsubscribe;
  }, [messaging]);
  return (
    <SafeAreaView style={style.safeArea}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
