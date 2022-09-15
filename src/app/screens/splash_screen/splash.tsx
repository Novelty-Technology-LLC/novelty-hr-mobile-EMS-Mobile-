import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import normalize from "react-native-normalize";
import { navigate } from "../../utils/navigation";
import { getVersion } from "react-native-device-info";
import { getToken } from "../../utils";

const SplashScreen = (props: any) => {
  const tryLocalSignIn = async () => {
    try {
      let userToken = await getToken();
      if (userToken) {
        navigate("BottomTabs");
      } else {
        navigate("login");
      }
    } catch (e) {}
  };

  return (
    <View style={[styles.wrapper]}>
      <LottieView
        source={require("../../../assets/splash-screen.json")}
        autoPlay
        loop={false}
        onAnimationFinish={tryLocalSignIn}
      />
      <View style={styles.version}>
        <Text>Version {getVersion()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  version: {
    position: "absolute",
    bottom: normalize(30),
  },
});

export { SplashScreen };
