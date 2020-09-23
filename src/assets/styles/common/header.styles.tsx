import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import color from "../../colors";
import { theme } from "../theme";

const headerStyle = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: normalize(10),
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  text: {
    fontSize: theme.size.lg,
    paddingLeft: normalize(30),
    color: color.primary,
  },
  textContainer: { flexDirection: "row", alignItems: "center" },
});

export { headerStyle };
