import { theme, fonts } from "../theme";
import color from "../../colors";
import normalize from "react-native-normalize";
import { Platform, StyleSheet } from "react-native";

const headerTxtStyle = StyleSheet.create({
  main: {
    width: "96%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.lg),
    color: color.primary,
    textTransform: "uppercase",
    ...Platform.select({
      android: {
        paddingTop: normalize(5),
      },
    }),
  },
});

export { headerTxtStyle };
