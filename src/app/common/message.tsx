import { WSnackBar } from 'react-native-smart-tip';
import colors from '../../assets/colors';

const snackBarMessage = (msg) => {
  const snackBarOpts = {
    data: msg,
    position: WSnackBar.position.TOP,
    duration: WSnackBar.duration.LONG,
    textColor: colors.white,
    backgroundColor: colors.green,
    actionTextColor: '#ff490b',
  };
  return WSnackBar.show(snackBarOpts);
};

export { snackBarMessage };
