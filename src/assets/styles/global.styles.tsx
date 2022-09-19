import { StyleSheet } from "react-native";
import colors from "../colors";

const globalStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fullScreen: {
    backgroundColor: colors.black,
    flex: 1,
  },
});

export { globalStyle };
