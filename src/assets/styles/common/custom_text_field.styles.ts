import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import color from "../../../assets/colors";

export const customTextFieldStyles = StyleSheet.create({
  textinputContainer: {
    marginBottom: normalize(25),
  },
  textInput: {
    minHeight: normalize(55),
    width: "100%",
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  error: {
    paddingTop: normalize(10),
    color: color.red,
  },
});
