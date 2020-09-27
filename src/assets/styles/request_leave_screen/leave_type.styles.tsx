import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import color from '../../colors';
import { theme, fonts } from '../theme';

const leaveType = StyleSheet.create({
  container: { borderBottomWidth: 1, borderBottomColor: color.border },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(20),
  },
  text: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: normalize(20),
  },
  paidView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    backgroundColor: color.buttonOrange,
    borderRadius: normalize(3),
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(25),
        borderRadius: normalize(3),
      },
      android: {
        paddingHorizontal: normalize(35),
        borderRadius: normalize(4),
      },
    }),
  },
  spacer: {
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(theme.spacing.button),
      },
      android: {
        paddingHorizontal: normalize(theme.spacing.button),
      },
    }),
  },
  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    backgroundColor: color.buttonGrey,
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(25),
        borderRadius: normalize(3),
      },
      android: {
        paddingHorizontal: normalize(35),
        borderRadius: normalize(4),
      },
    }),
  },
  buttonTextPaid: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.normal),
    color: colors.fontOrange,
  },
  buttonTextFloat: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.normal),
    color: colors.fontGrey,
  },
  buttonPaid: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonFloat: {
    fontSize: normalize(theme.size.sm),
  },
});

export { leaveType };
