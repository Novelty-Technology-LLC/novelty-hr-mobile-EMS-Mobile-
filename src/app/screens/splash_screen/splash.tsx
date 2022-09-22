import React from "react";
import { StyleSheet, Text, View } from "react-native";
import normalize from "react-native-normalize";
import { navigate } from "../../utils/navigation";
import { getVersion } from "react-native-device-info";
import { getToken } from "../../utils";
import Svg, { Path } from "react-native-svg";

const SplashScreen = (props: any) => {
  return (
    <View style={[styles.wrapper]}>
      <Svg width={97.951} height={83.239} viewBox="0 0 97.951 83.239">
        <Path
          d="M60.009 20.371v15.831l11.066-5.78.013 23.741-22.013 11.806v-39.8L0 0v57.073l14.919 7.964.1-40.05 19.02 10.232-.1 40.05 15.013 7.906v.063l.056-.033.06.033v-.063L86.34 63.364l-.016-39.887 11.627-6.057V0z"
          fill="#bf8b59"
        />
      </Svg>
      {/* code will be inneed */}
      {/* <Svg width={97.951} height={83.239} viewBox="0 0 97.951 83.239">
        <Path/>
      </Svg> */}
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
