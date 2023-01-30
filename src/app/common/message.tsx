import { hasDynamicIsland, hasNotch } from "react-native-device-info";
import { WSnackBar } from "react-native-smart-tip";
import Snackbar from "react-native-snackbar";
import Toast from "react-native-toast-message";
import colors from "../../assets/colors";
import { fonts } from "../../assets/styles";

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
