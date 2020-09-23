import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const leaveDashboardStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: normalize(10),
    flex: 1,
  },
  plus: {
    padding: normalize(15),
    borderRadius: normalize(40),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: normalize(20),
    bottom: normalize(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export { leaveDashboardStyle };
