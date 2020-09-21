import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const requestStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(20),
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: normalize(20),
    paddingLeft: normalize(15),
    marginRight: normalize(20),
    backgroundColor: colors.snow,
    paddingRight: normalize(10),
    borderRadius: 2,
    marginVertical: 7,
  },
  date: {
    fontWeight: "bold",
    fontSize: normalize(18),
  },
  type: {
    color: colors.secondary,
    fontSize: normalize(12),
  },
  state: {
    color: colors.secondary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    paddingHorizontal: normalize(5),
  },
  button: {
    width: normalize(75),
    paddingVertical: normalize(6),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  subcontainer: {
    width: normalize(200),
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: normalize(10),
    paddingRight: normalize(20),
  },
  days: {
    color: colors.secondary,
  },
});

export { requestStyle };
