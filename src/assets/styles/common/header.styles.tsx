import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../colors";

const headerStyle = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    flexDirection: "row",
    alignItems: "center",
    height: normalize(50),
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: normalize(20),
    paddingLeft: normalize(30),
    color: color.primary,
  },
  textContainer: { flexDirection: "row", alignItems: "center" },
});

export { headerStyle };
