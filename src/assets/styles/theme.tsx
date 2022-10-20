import { Platform } from "react-native";
import { useDarkMode } from "react-native-dynamic";

const color = {
  black: "#000000",
  white: "#ffffff",
};

const fonts = {
  PoppinsSemibold:
    Platform.OS === "ios" ? "Poppins-SemiBold" : "poppins.semibold",
  poppinsMedium: Platform.OS === "ios" ? "Poppins-Medium" : "poppins.medium",
  poppinsRegular: Platform.OS === "ios" ? "Poppins-Regular" : "poppins.regular",
  mulishRegular: "Mulish-Regular",
  mulishBold: "Mulish-Bold",
  mulishSemiBold: "Mulish-SemiBold",
};

const theme = {
  size: {
    xxxs: 5,
    xxs: 10,
    xs: 12,
    sm: 14,
    normal: 15,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 67,
    logo: 32,
  },
  spacing: {
    normal: 1,
    wide: 2,
    wider: 5,
    tight: 0.5,
    button: 10,
    logo: 20,
  },
  // color: {
  //   theme_color: "#5FC4D6",
  //   background_color: "#FFFFFF",
  //   normal_text_color: "#000000",
  //   light_grey: "#F5F5F5",
  //   button_color: "#EA6E2C",
  //   input_placeholer: "#999999",
  //   card_border: "#F4F5F7",
  //   chart_bg_color: "#F7F7F7",
  //   piggy_bank: "#7AD88F",
  // },
};

const isDarkMode = () => {
  return useDarkMode();
};

export { theme, color, fonts, isDarkMode };
