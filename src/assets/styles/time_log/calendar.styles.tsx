import { StyleSheet, Platform } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts, theme } from "../theme";

const calenderStyle = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  main: {
    height: normalize(100),
    paddingTop: normalize(theme.size.xxs),
  },
  header: {
    fontFamily: fonts.poppinsMedium,
    color: colors.black,
    fontSize: normalize(theme.size.normal),
    marginRight: normalize(5),
    marginTop: normalize(5),
  },
  highlight: {
    fontWeight: "normal",
    fontSize: normalize(theme.size.base),
    color: colors.black,
    ...Platform.select({
      android: { fontFamily: "Roboto" },
    }),
  },
  highlightContainer: {
    backgroundColor: colors.buttonOrange,
    ...Platform.select({
      android: { borderRadius: normalize(5) },
      ios: { borderRadius: normalize(3) },
    }),
  },
  number: {
    color: colors.black,
    fontWeight: "normal",
    fontSize: normalize(theme.size.base),
    width: "100%",
    paddingHorizontal: normalize(8),
    ...Platform.select({
      android: { fontFamily: "Roboto" },
    }),
    textAlign: "left",
    marginLeft: normalize(5),
    marginRight: normalize(5),
  },
  modalCalender: {
    width: "82%",
    alignItems: "center",
  },
  align: { alignSelf: "flex-end" },

  dayBlock: {
    paddingHorizontal: normalize(10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(15),
    borderRadius: 3,
  },
  dayBlockText: {
    alignSelf: "center",
    color: colors.black,
  },
  container: {
    marginTop: normalize(5),
  },
});

export { calenderStyle };
