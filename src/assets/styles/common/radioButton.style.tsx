import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";
import { fonts } from "../theme";

const customRadioButtonStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(15),
  },
  body: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
});

export { customRadioButtonStyle };
