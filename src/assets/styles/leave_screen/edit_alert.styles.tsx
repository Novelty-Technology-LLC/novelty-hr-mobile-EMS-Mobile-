import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const editAlertStyle = StyleSheet.create({
  container: {
    paddingLeft: normalize(15),
    paddingBottom: normalize(30),
    paddingTop: normalize(20),
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
    paddingBottom: normalize(25),
  },
  textArea: {
    backgroundColor: "#f5f5f5",
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { editAlertStyle };
