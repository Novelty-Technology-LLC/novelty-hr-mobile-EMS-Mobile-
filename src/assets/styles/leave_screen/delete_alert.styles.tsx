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
});

export { deleteAlertStyle };
