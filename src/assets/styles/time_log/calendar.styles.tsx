import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { color, fonts, theme } from '../theme';

const calenderStyle = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  main: {
    height: normalize(130),
    paddingTop: normalize(theme.size.lg),
    paddingBottom: normalize(theme.size.xxs),
  },
  header: {
    fontFamily: fonts.poppinsMedium,
    color: colors.black,
    paddingBottom: normalize(theme.size.logo),
    fontSize: normalize(theme.size.lg),
  },
  highlight: {
    color: colors.primary,
    backgroundColor: colors.buttonOrange,
    borderRadius: normalize(theme.size.logo),
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(6),
    fontSize: normalize(20),
  },
  number: {
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(20),
  },
});

export { calenderStyle };
