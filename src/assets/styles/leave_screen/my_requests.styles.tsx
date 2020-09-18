import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const myRequestsStyle = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: normalize(20),
    marginHorizontal: normalize(20),
  },
  title: {
    fontSize: normalize(25),
  },
  history: {
    color: colors.secondary,
  },
});

export { myRequestsStyle };
