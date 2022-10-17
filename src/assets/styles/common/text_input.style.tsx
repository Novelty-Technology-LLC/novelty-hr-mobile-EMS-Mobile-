import { StyleSheet } from "react-native";
import colors from "../../colors";
import { theme } from "../theme";

export const commonInputFieldStyle = StyleSheet.create({
  field: {
    flex: 1,
    paddingTop: theme.size.xxs,
    paddingRight: theme.size.xxs,
    paddingBottom: theme.size.xxs,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: colors.label,
  },
  floatingField: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingFieldContainer: {
    borderWidth: 0,
    paddingHorizontal: theme.size.xxs,
    backgroundColor: "#ffffff",
    borderRadius: theme.size.xxs,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    color: colors.label,
    paddingHorizontal: theme.size.xxxs,
  },
  inputStyle: {
    color: "#000000",
    // fontFamily: theme.,
    fontSize: theme.size.base,
    paddingTop: theme.size.base,
    textAlignVertical: "bottom",
  },
});
