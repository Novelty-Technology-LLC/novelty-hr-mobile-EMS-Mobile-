import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import color from '../../colors';
import { fonts, theme } from '../theme';

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: normalize(40),
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  remaining: {
    fontWeight: '300',
    fontSize: normalize(theme.size.xxl),
    fontFamily: fonts.mulishRegular,
  },
  total: {
    fontWeight: '100',
    fontSize: normalize(theme.size.base),
    fontFamily: fonts.mulishRegular,
  },
  text: {
    fontSize: normalize(theme.size.xl),
    color: color.primary,
  },
  title: {
    fontSize: normalize(theme.size.sm),
    color: colors.black,
    fontFamily: fonts.PoppinsSemibold,
    textTransform: 'capitalize',
  },
  footer: {
    fontSize: normalize(theme.size.xxs),
    color: color.secondary,
    fontFamily: fonts.poppinsRegular,
  },
});

export { daysRemainingStyle };
