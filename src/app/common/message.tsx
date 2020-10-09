import { WSnackBar } from 'react-native-smart-tip';
import colors from '../../assets/colors';

const snackBarMessage = (msg) => {
  const snackBarOpts = {
    data: msg,
    position: WSnackBar.position.BOTTOM,
    duration: WSnackBar.duration.LONG,
    textColor: colors.green,
    backgroundColor: '#050405',
    actionTextColor: '#ff490b',
  };
  return WSnackBar.show(snackBarOpts);
};

export { snackBarMessage };
