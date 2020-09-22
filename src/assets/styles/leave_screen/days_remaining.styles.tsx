import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../colors";
import { theme } from "../theme";

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: "50%",
    alignItems: "center",
    paddingBottom: normalize(40),
  },
  remaining: {
    fontWeight: "300",
    fontSize: theme.size.xxl,
  },
  total: {
    fontWeight: "100",
  },
  text: {
    fontSize: theme.size.xl,
    color: color.primary,
  },
  title: {
    fontWeight: "bold",
  },
  footer: {
    fontWeight: "normal",
    fontSize: theme.size.xxs,
    color: color.secondary,
  },
});

export { daysRemainingStyle };
