import { hasDynamicIsland, hasNotch } from "react-native-device-info";
import Toast from "react-native-toast-message";

const snackBarMessage = (msg: string) => {
  Toast.show({
    topOffset: hasDynamicIsland() ? 55 : hasNotch() ? 40 : 5,
    type: "success",
    text1: msg,
  });
};

const showToast = (msg: string, success = true) => {
  Toast.show({
    topOffset: hasDynamicIsland() ? 55 : hasNotch() ? 40 : 5,
    type: success ? "success" : "error",
    text1: msg,
  });
};

export { snackBarMessage, showToast };
