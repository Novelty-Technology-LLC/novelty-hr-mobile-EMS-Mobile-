import { WSnackBar } from 'react-native-smart-tip';
import {fonts} from '../../assets/styles/theme'
const snackErrorBottom = (err) => {
  const snackBarOpts = {
    data: err.message,
    position: WSnackBar.position.BOTTOM,
    duration: WSnackBar.duration.LONG,
    textColor: '#ffffff',
    fontFamily:fonts.PoppinsSemibold,
    backgroundColor: '#ff3300',
    actionTextColor: '#ffffff',
  };
  return WSnackBar.show(snackBarOpts);
};

const snackErrorTop = (err) => {
  const snackBarOpts = {
    data: err.message,
    position: WSnackBar.position.TOP,
    duration: WSnackBar.duration.LONG,
    textColor: '#ffffff',
    fontFamily:fonts.PoppinsSemibold,
    backgroundColor: '#ff3300',
    actionTextColor: '#ffffff',
  };
  return WSnackBar.show(snackBarOpts);
};

export { snackErrorBottom,snackErrorTop };
