import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    width: normalize(50),
    paddingVertical: normalize(5),
  },
});

export { swipeStyle };
