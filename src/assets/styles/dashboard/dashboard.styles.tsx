import { Platform, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { fonts, theme } from "..";
import colors from "../../colors";

const dashboardStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingTop: normalize(20),
    backgroundColor: colors.white,
    paddingHorizontal: normalize(20),
  },
  text: {
    color: colors.text,
    fontSize: normalize(16),
  },
  gap: {
    marginTop: normalize(5),
  },
  name: {
    color: colors.black,
    fontSize: normalize(theme.size.base),
    fontFamily: fonts.PoppinsSemibold,
  },
  workshift: {
    color: colors.primary,
    fontFamily: fonts.mulishBold,

    fontSize: normalize(theme.size.sm),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  work: {
    flexDirection: "row",
    alignItems: "center",
    padding: normalize(8),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(20),
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  office: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    borderRadius: normalize(20),
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  workText: {
    color: colors.fontGrey,
    fontSize: normalize(12),
  },
  officeText: {
    color: colors.fontGrey,
    fontSize: normalize(12),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  pressableText: {
    color: "#343A40",
    padding: theme.size.xxxs,
  },
  timeBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: theme.size.xxs,
  },
  pressableContainer: {
    borderColor: "#e3e1e1",
    borderWidth: 1,
    borderRadius: theme.size.xxxs,
    marginBottom: theme.size.lg,
  },
  image: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
  },
  officeImage: {
    height: normalize(20),
    width: normalize(20),
    borderRadius: normalize(20),
  },
  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  wrapItem: {
    width: "49%",
    marginTop: normalize(25),
    borderRadius: normalize(8),
  },
  timeLog: {
    marginTop: normalize(20),
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  marking: {
    marginTop: normalize(20),
    paddingRight: normalize(30),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: -100,
  },
  markingBody: { flexDirection: "row", alignItems: "center" },
  markingGap: {
    marginLeft: normalize(7),
  },
  border: {
    height: normalize(1),
    width: normalize(15),
    borderRadius: normalize(Platform.OS === "ios" ? 2 : 4),
    borderWidth: normalize(Platform.OS === "ios" ? 3 : 5),
  },
  chartWrapper: {
    marginTop: normalize(16),
    width: "100%",
    overflow: "hidden",
    marginBottom: normalize(50),
  },
  loader: {
    backgroundColor: "transparent",
    height: normalize(180),
    width: "100%",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(4),
  },
});

export { dashboardStyle };
