import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../colors";

const paddingTop = normalize(20);

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  tabbar: {
    flexDirection: "column",

    justifyContent: "flex-start",
  },
  invContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 90,
  },
  invWrapper: {
    flex: 0.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  benifitsTabbar: {
    flexDirection: "column",
    // paddingTop: DeviceInfo.hasNotchAndIsland() ? 20 : 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  appContainer: {
    paddingTop,
    paddingBottom: normalize(25),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: colors.transparent,
  },
  caseDetailTabbar: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    backgroundColor: colors.transparent,
    overflow: "hidden",
  },

  body: {
    paddingHorizontal: 20,
    fleX: 1,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topHeader: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cutomImg: {
    flexDirection: "column",
    paddingHorizontal: 12,
    flex: 1,
  },
  leftBody: { flexDirection: "row", alignItems: "center" },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.transparent,
  },
});
