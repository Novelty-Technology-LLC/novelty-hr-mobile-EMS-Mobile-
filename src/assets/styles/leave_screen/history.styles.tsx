import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const historyStyle = StyleSheet.create({
  header: {
    paddingLeft: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(10),
    color: colors.secondary,
  },
  container: {
    paddingBottom: normalize(40),
  },
  subcontainer: {
    flexDirection: "row",
    marginRight: normalize(20),
    alignItems: "center",
  },
  line: {
    paddingTop: normalize(22),
    width: "65%",
    marginHorizontal: normalize(20),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});

export { historyStyle };
