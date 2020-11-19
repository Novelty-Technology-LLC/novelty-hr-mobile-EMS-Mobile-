import { WSnackBar } from 'react-native-smart-tip';
import colors from '../../assets/colors';
import { fonts } from '../../assets/styles/theme';
import Snackbar from 'react-native-snackbar';
const snackErrorBottom = (err) => {
  return Snackbar.show({
    text: err.message,
    textColor: colors.white,
    backgroundColor: '#ff3300',
    fontFamily: fonts.mulishBold,
    duration: Snackbar.LENGTH_LONG,
  });
};

const snackErrorTop = (err) => {
  return Snackbar.show({
    text: err.message,
    textColor: colors.white,
    backgroundColor: '#ff3300',
    fontFamily: fonts.mulishBold,
    duration: Snackbar.LENGTH_LONG,
  });
};

export { snackErrorBottom, snackErrorTop };
