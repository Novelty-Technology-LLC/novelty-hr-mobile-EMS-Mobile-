import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { theme } from "../theme";

const requestWithImageStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: normalize(37),
    height: normalize(37),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  gap: {
    paddingRight: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: theme.size.base,
    color: colors.black,
  },
  date: { flexDirection: "row", paddingTop: normalize(10) },
  type: {
    fontSize: theme.size.xs,
    color: colors.secondary,
  },
});

export { requestWithImageStyle };
