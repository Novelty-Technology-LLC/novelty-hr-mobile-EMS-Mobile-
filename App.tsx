import React, { useEffect } from "react";
import { SafeAreaView, Platform } from "react-native";
import RootNavigation from "./src/app/navigations";
import { globalStyle as style } from "./src/assets/styles";
import messaging from "@react-native-firebase/messaging";
import { SetLocalNotification } from "./src/app/utils/pushNotification";
import SplashScreen from "react-native-splash-screen";
import { WRootToastApp } from "react-native-smart-tip";
import { requestNotificationPermission } from "./src/app/utils/permission";

const App = (props: any) => {
  useEffect(() => {
    requestNotificationPermission();
    SplashScreen.hide();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      if (remoteMessage) {
        Platform.OS === "ios" &&
          SetLocalNotification(remoteMessage.notification.body);
      }
    });
    return unsubscribe;
  }, [messaging]);

  return (
    <SafeAreaView style={style.safeArea}>
      <WRootToastApp>
        <RootNavigation />
      </WRootToastApp>
    </SafeAreaView>
  );
};

export default App;
