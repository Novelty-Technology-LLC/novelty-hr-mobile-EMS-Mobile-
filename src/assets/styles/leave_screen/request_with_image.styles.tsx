import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const requestWithImageStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    paddingRight: 5,
  },

  image: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  name: {
    fontWeight: "bold",
  },
  type: {
    fontSize: normalize(12),
    color: colors.secondary,
  },
});

export { requestWithImageStyle };
