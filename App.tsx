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
        width: "97%",
        borderLeftColor: "#4BB543",
        backgroundColor: "#4BB543",
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
          width: "97%",
          borderLeftColor: "#cc0000",
          backgroundColor: "#cc0000",
        }}
        text1NumberOfLines={2}
        text1Style={{ fontSize: Normalize(14), color: colors.white }}
      />
    );
  },
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestNotificationPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      if (remoteMessage) {
        Platform.OS === "ios" &&
          SetLocalNotification(remoteMessage.notification.body);
      }
    });
    return unsubscribe;
  }, [messaging]);

  return (
    <>
      <SafeAreaView style={style.safeArea}>
        <RootNavigation />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
