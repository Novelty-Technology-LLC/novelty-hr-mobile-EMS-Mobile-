import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const calenderStyle = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  main: {
    height: normalize(110),
    paddingTop: normalize(theme.size.xxs),
    paddingBottom: normalize(theme.size.xxs),
  },
  header: {
    fontFamily: fonts.poppinsMedium,
    color: colors.black,
    fontSize: normalize(theme.size.lg),
  },
  highlight: {
    color: colors.primary,
    backgroundColor: colors.buttonOrange,
    borderRadius: normalize(theme.size.logo),
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(8),
    fontSize: normalize(20),
  },
  number: {
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(20),
  },
});

export { calenderStyle };
