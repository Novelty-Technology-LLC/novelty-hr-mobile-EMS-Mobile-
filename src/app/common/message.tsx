import Snackbar from "react-native-snackbar";
import { WSnackBar } from "react-native-smart-tip";
import { fonts } from "../../assets/styles";
import colors from "../../assets/colors";
import { Easing } from "react-native";

const snackBarMessage = (msg: string) => {
  Snackbar.show({
    text: msg,
    textColor: colors.white,
    backgroundColor: colors.green,
    fontFamily: fonts.mulishBold,
    duration: Snackbar.LENGTH_LONG,
  });
};

const showToast = (msg: string, success = true) => {
  const snackBarOpts = {
    data: msg,
    isAllowSlideExit: true,
    position: WSnackBar.position.TOP,
    duration: WSnackBar.duration.LONG,
    textColor: "#ffffff",
    numberOfLines: 2,
    icon: false,

    backgroundColor: success ? colors.green : colors.red,
  };
  WSnackBar.show(snackBarOpts);
};

export { snackBarMessage, showToast };
