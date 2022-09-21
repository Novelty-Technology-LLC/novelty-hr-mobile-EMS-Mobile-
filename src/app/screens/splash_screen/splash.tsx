import React from "react";
import { StyleSheet, Text, View } from "react-native";
import normalize from "react-native-normalize";
import { navigate } from "../../utils/navigation";
import { getVersion } from "react-native-device-info";
import { getToken } from "../../utils";
import { SvgUri } from "react-native-svg";
import Logo from "../../../assets/images/novelty.svg";

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
      {/* <Image
        source={require("../../../assets/images/novelty.svg")}
        // autoPlay
        // loop={false}
        // onAnimationFinish={tryLocalSignIn}
      /> */}
      <SvgUri
        width="900"
        height="200"
        source={require("../../../assets/images/novelty.svg")}
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
