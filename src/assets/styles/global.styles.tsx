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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  button: {
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
});

export { globalStyle };
