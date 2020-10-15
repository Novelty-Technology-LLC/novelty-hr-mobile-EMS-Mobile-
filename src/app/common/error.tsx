import { WSnackBar } from 'react-native-smart-tip';
import {fonts} from '../../assets/styles/theme'
const snackErrorBottom = (err) => {
  const snackBarOpts = {
    data: err.message,
    position: WSnackBar.position.BOTTOM,
    duration: WSnackBar.duration.LONG,
    textColor: '#ff490b',
    fontFamily:fonts.PoppinsSemibold,
    backgroundColor: '#fff',
    actionTextColor: '#ff490b',
    fontWeight:700
  };
  return WSnackBar.show(snackBarOpts);
};

export { snackErrorBottom };
