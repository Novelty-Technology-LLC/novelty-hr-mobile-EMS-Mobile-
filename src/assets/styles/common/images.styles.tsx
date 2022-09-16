import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../colors";

const customImageStyle = StyleSheet.create({
  imageLoader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: normalize(50),
    borderWidth: 5,
    borderColor: colors.primary,
    height: normalize(80),
    width: normalize(80),
  },
});

export { customImageStyle };
