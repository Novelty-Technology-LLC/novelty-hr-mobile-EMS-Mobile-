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
  closeIconFullScreen: {
    alignSelf: "flex-end",
    position: "absolute",
    padding: 15,
  },
  titleWeight: { fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between" },
});

export { globalStyle };
