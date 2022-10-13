import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";

export const textAreaStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(15),
    justifyContent: "center",
    alignItems: "center",
  },
  textareaContainer: {
    padding: normalize(5),
    backgroundColor: "#ffffff",
  },
  textarea: {
    textAlignVertical: "top",
    height: 170,
    fontSize: normalize(14),
    color: "#3E3E3F",
  },
});
