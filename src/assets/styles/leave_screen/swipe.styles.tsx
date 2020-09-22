import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    width: normalize(50),
    paddingVertical: normalize(10),
    marginRight: normalize(10),
  },
});

export { swipeStyle };
