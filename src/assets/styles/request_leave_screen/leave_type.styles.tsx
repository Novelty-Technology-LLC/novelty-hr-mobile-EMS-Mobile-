import { StyleSheet } from 'react-native';
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: normalize(20),
  },
  paidView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(15),
    backgroundColor: color.buttonOrange,
    borderRadius: normalize(3),
  },
  spacer: {
    paddingHorizontal: theme.spacing.button,
  },
  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(35),
    paddingVertical: normalize(15),
    backgroundColor: color.buttonGrey,
    borderRadius: normalize(4),
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
