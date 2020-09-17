import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../colors";

const headerStyle = StyleSheet.create({
  container: {
    paddingLeft: normalize(20),
    flexDirection: "row",
    alignItems: "center",
    height: normalize(50),
  },
  text: {
    fontSize: normalize(25),
    paddingLeft: normalize(30),
    color: color.primary,
  },
});

export { headerStyle };
