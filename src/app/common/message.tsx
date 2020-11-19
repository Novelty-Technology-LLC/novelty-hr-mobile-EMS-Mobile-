import colors from '../../assets/colors';
import Snackbar from 'react-native-snackbar';
import { fonts } from '../../assets/styles';

const snackBarMessage = (msg) => {
  Snackbar.show({
    text: msg,
    textColor: colors.white,
    backgroundColor: colors.green,
    fontFamily: fonts.mulishBold,
    duration: Snackbar.LENGTH_LONG,
  });
};

export { snackBarMessage };
