import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { theme } from "../theme";

const myRequestsStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: normalize(20),
    marginHorizontal: normalize(20),
  },
  title: {
    fontSize: theme.size.xl,
  },
  history: {
    color: colors.secondary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    width: normalize(10),
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: normalize(35),
    marginHorizontal: normalize(20),
    borderRadius: 2,
    backgroundColor: colors.snow,
  },
  emptyText: {
    color: colors.secondary,
  },
});

export { myRequestsStyle };
