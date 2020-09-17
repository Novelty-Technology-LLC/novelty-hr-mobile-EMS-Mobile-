import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const requestStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontWeight: "bold",
    fontSize: 18,
  },
  type: {
    color: colors.secondary,
    fontSize: 12,
  },
  state: {
    color: colors.secondary,
  },
  row: {
    flexDirection: "row",
  },
  space: {
    paddingHorizontal: 5,
  },
});

export { requestStyle };
