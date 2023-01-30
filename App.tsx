import React, { useEffect } from "react";
import { SafeAreaView, Platform, View, Text } from "react-native";
import RootNavigation from "./src/app/navigations";
import { globalStyle as style } from "./src/assets/styles";
import messaging from "@react-native-firebase/messaging";
import { SetLocalNotification } from "./src/app/utils/pushNotification";
import SplashScreen from "react-native-splash-screen";
import { requestNotificationPermission } from "./src/app/utils/permission";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import colors from "./src/assets/colors";
import Normalize from "./src/app/utils/normalize";
import { WRootToastApp } from "react-native-smart-tip";

const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      style={{
        width: "95%",
        borderLeftColor: "#33cc33",
        backgroundColor: "#33cc33",
      }}
      text1NumberOfLines={2}
      text1Style={{ fontSize: Normalize(14), color: colors.white }}
    />
  ),
  error: (props: any) => {
    return (
      <ErrorToast
        {...props}
        style={{
          width: "95%",
          borderLeftColor: "#ff0033",
          backgroundColor: "#ff0033",
        }}
        text1NumberOfLines={2}
        text1Style={{ fontSize: Normalize(14), color: colors.white }}
      />
    );
  },
};

const App = () => {
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
