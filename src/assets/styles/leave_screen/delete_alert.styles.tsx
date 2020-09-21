import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const deleteAlertStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: normalize(30),
  },
  gap: {
    width: normalize(10),
  },
  cancel: {
    color: colors.black,
  },
  delete: {
    color: colors.primary,
  },
  iconContainer: {
    backgroundColor: colors.snow,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export { deleteAlertStyle };
