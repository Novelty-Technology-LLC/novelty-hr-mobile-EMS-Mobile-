import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const calenderStyle = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  icon: {
    alignItems: 'center',
    width: '10%',
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(10),
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
    borderRadius: normalize(30),
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    fontSize: normalize(20),
  },
  number: {
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(20),
  },
  modalCalender: {
    paddingTop: 0,
  },
});

export { calenderStyle };
