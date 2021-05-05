import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import color from '../../colors';
import { fonts, theme } from '../theme';

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: normalize(5),
  },
  logcontainer: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: normalize(5),
    paddingTop: normalize(10)
  },
  remaining: {
    fontWeight: '300',
    fontSize: normalize(35),
    fontFamily: fonts.mulishRegular,
    marginBottom: 0
  },
  total: {
    fontWeight: '100',
    fontSize: normalize(20),
    fontFamily: fonts.mulishRegular,
  },
  text: {
    fontSize: normalize(theme.size.xl),
    color: color.primary,
    paddingBottom: 0,
  },
  title: {
    color: colors.black,
    fontFamily: fonts.mulishBold,
    textTransform: 'capitalize',
  },
  footer: {
    fontSize: normalize(theme.size.xs),
    color: color.fontGrey,
    fontFamily: fonts.mulishRegular,
    textTransform: 'capitalize',
  },
});

export { daysRemainingStyle };
