import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const appButtonStyle = StyleSheet.create({
  approve: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    borderRadius: 2,
  },
  approveText: {
    color: colors.white,
    fontSize: normalize(14),
  },
  deny: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    borderRadius: 2,
  },
  denyText: {
    color: colors.primary,
    fontSize: normalize(14),
  },
});

export { appButtonStyle };
