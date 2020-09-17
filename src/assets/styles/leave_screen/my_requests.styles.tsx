import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const myRequestsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: normalize(20),
  },
  title: {
    fontSize: normalize(25),
  },
  history: {
    color: colors.secondary,
  },
  list: {
    paddingLeft: normalize(20),
  },
});

export { myRequestsStyle };
