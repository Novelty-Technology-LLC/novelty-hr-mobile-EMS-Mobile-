import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import color from '../../colors';
import { fonts, theme } from '../theme';

const daysRemainingStyle = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: normalize(20),
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  logcontainer: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: normalize(20),
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
  gap: {
    ...Platform.select({
      android: {
        paddingHorizontal: normalize(4),
      },
      ios: {
        paddingHorizontal: normalize(2),
      },
    }),
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
    fontSize: normalize(theme.size.xs),
    color: color.fontGrey,
    fontFamily: fonts.poppinsRegular,
  },
});

export { daysRemainingStyle };
