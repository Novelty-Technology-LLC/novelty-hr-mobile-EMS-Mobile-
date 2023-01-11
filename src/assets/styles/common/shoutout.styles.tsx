import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts, theme } from "../theme";
export const shoutoutStyles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(20),
    paddingVertical: normalize(10),
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(20),
  },
  subtitle: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
  },
});
