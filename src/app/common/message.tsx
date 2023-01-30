import { hasDynamicIsland, hasNotch } from "react-native-device-info";
import { WSnackBar } from "react-native-smart-tip";
import Snackbar from "react-native-snackbar";
import Toast from "react-native-toast-message";
import colors from "../../assets/colors";
import { fonts } from "../../assets/styles";

const snackBarMessage = (msg: string) => {
  Toast.show({
    topOffset: hasDynamicIsland() ? 55 : hasNotch() ? 40 : 5,
    type: "success",
    text1: msg,
  });
};

const showToast = (msg: string, success = true) => {
  // const snackBarOpts = {
  //   data: msg,
  //   isAllowSlideExit: true,
  //   position: WSnackBar.position.TOP,
  //   duration: WSnackBar.duration.LONG,
  //   textColor: "#ffffff",
  //   numberOfLines: 2,
  //   icon: false,
  //   backgroundColor: success ? colors.green : colors.red,
  // };
  // WSnackBar.show(snackBarOpts);

  Toast.show({
    topOffset: hasDynamicIsland() ? 55 : hasNotch() ? 40 : 5,
    type: success ? "success" : "error",
    text1: msg,
  });
};

export { snackBarMessage, showToast };
