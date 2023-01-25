import Toast from "react-native-toast-message";

const snackBarMessage = (msg: string) => {
  Toast.show({
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
  //   backgroundColor: success ? colors.green : "#cc3300",
  // };
  // WSnackBar.show(snackBarOpts);
  Toast.show({
    type: success ? "success" : "error",
    text1: msg,
  });
};

export { snackBarMessage, showToast };
