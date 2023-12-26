import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts } from "../theme";

const emptyContainerStyle = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: normalize(15),
    borderRadius: 2,
    backgroundColor: colors.snow,
  },
  emptyText: {
    color: colors.secondary,
    fontFamily: fonts.mulishRegular,
    textAlign: "center",
    alignItems: "center",
  },
});

export { emptyContainerStyle };
