import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../colors";
import { theme } from "../theme";

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: "50%",
    alignItems: "center",
    paddingBottom: normalize(40),
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  remaining: {
    fontWeight: "300",
    fontSize: theme.size.xxl,
  },
  total: {
    fontWeight: "100",
    fontSize: theme.size.base,
  },
  text: {
    fontSize: theme.size.xl,
    color: color.primary,
  },
  title: {
    fontWeight: "bold",
    fontSize: theme.size.sm,
  },
  footer: {
    fontWeight: "normal",
    fontSize: theme.size.xxs,
    color: color.secondary,
  },
});

export { daysRemainingStyle };
