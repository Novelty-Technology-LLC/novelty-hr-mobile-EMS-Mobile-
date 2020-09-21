import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const otherRequestsStyle = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: normalize(20),
    marginRight: normalize(20),
    marginLeft: normalize(10),
    paddingTop: normalize(20),
  },
});

export { otherRequestsStyle };
