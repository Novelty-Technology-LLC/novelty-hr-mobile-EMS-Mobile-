import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const calenderStyle = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  main: {
    height: normalize(100),
    paddingTop: normalize(theme.size.xxs),
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
    width: '100%',
    ...Platform.select({
      android: { fontFamily: 'Roboto' },
    }),
    textAlign: 'left',
    marginLeft: 5,
    marginRight: 5,
  },
  number: {
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(20),
    width: '100%',
    paddingHorizontal: normalize(8),
    ...Platform.select({
      android: { fontFamily: 'Roboto' },
    }),
    textAlign: 'left',
    marginLeft: 5,
    marginRight: 5,
  },
  modalCalender: {
    width: '82%',
    alignItems: 'center',
  },
  align: { alignSelf: 'flex-end' },

  dayBlock: {
    paddingHorizontal: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(15),
    borderRadius: 3,
  },
  dayBlockText: {
    alignSelf: 'center',
    color: colors.black,
  },
});

export { calenderStyle };
