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
    fontWeight: "bold",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textareaContainer: {
    height: normalize(140),
    width: normalize(280),
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: colors.grey,
    opacity: 0.8,
  },
  textArea: {
    height: normalize(130),
    textAlignVertical: "top",
  },
});

export { editAlertStyle };
