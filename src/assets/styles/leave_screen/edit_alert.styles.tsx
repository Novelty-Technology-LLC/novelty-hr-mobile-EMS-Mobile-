import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const editAlertStyle = StyleSheet.create({
  container: {
    paddingLeft: normalize(15),
    paddingBottom: normalize(20),
  },
  title: {
    margin: 0,
    padding: 0,
  },
  cancel: {
    color: colors.black,
  },
  delete: {
    color: colors.primary,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  note: {
    color: colors.secondary,
    paddingBottom: normalize(15),
  },
  textArea: {
    backgroundColor: "#f5f5f5",
    alignItems: "flex-start",
  },
});

export { editAlertStyle };
