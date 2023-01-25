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

const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: "#33cc33", backgroundColor: "#33cc33" }}
      text1NumberOfLines={2}
      text1Style={{ fontSize: 14 }}
    />
  ),
  error: (props: any) => {
    return (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#e60000",
          backgroundColor: "#e60000",
        }}
        text1NumberOfLines={2}
        text1Style={{ fontSize: 14, color: colors.white }}
      />
    );
  },
};

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
      <RootNavigation />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default App;
