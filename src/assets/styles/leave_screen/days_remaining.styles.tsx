import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../colors";

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: "50%",
    alignItems: "center",
    paddingBottom: normalize(40),
  },
  remaining: {
    fontWeight: "300",
    fontSize: normalize(100),
  },
  total: {
    fontWeight: "100",
  },
  text: {
    fontSize: normalize(25),
    color: color.primary,
  },
  title: {
    fontWeight: "bold",
  },
  footer: {
    fontWeight: "normal",
    fontSize: 10,
    color: color.secondary,
  },
});

export { daysRemainingStyle };
