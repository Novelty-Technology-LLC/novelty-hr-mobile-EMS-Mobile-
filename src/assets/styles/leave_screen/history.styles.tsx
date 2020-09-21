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
});

export { historyStyle };
