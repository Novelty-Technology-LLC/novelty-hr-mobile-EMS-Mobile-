import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: normalize(30),
    fontFamily: "Suprema Thin",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export { loginStyle };
