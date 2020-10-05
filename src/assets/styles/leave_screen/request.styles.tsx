import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const requestStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: normalize(13),
    marginRight: normalize(20),
    backgroundColor: colors.snow,
    paddingRight: normalize(10),
    borderRadius: 2,
    marginVertical: 7,
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  wrapper: { flexDirection: 'row' },
  requestDate: {
    marginTop: normalize(theme.spacing.wide),
    fontSize: normalize(theme.size.xxs),
    fontFamily: fonts.mulishRegular,
    color: colors.fontGrey,
  },
  dateView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: normalize(10),
  },
  status: {
    ...Platform.select({
      ios: { marginTop: normalize(3) },
      android: { marginTop: normalize(4) },
    }),
  },
  date: {
    fontSize: normalize(theme.size.base),
    color: colors.black,
    fontFamily: fonts.mulishBold,
  },
  text: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
    paddingTop: normalize(theme.spacing.wide),
  },
  type: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium,
    marginTop: normalize(7),
  },
  icon: {
    transform: [{ rotate: '-40deg' }],
    backgroundColor: colors.requested,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        padding: normalize(2.9),
        borderRadius: normalize(8),
      },
      android: { padding: normalize(5), borderRadius: normalize(14) },
    }),
  },
  stateView: { flexDirection: 'column' },
  state: {
    fontFamily: fonts.poppinsMedium,
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  space: {
    ...Platform.select({
      ios: { paddingHorizontal: normalize(theme.spacing.wide) },
      android: { paddingHorizontal: normalize(theme.spacing.wider) },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: { marginTop: normalize(25) },
      android: { marginTop: normalize(30) },
    }),
  },
  buttonSpacer: {
    marginLeft: normalize(theme.spacing.wider),
  },
  approve: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.xs),
    color: colors.white,
  },
  deny: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.xs),
    color: colors.primary,
  },
  buttonApprove: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
  },
  buttonDeny: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(7),
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: normalize(5),
  },
  subcontainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  days: {
    color: colors.secondary,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.mulishRegular,
  },
  progress: {
    backgroundColor: colors.yellow,
    borderRadius: normalize(20),
    ...Platform.select({
      ios: { padding: normalize(3) },
      android: {
        padding: normalize(5),
      },
    }),
  },
  requested: {
    backgroundColor: colors.yellow,
    fontFamily: 'Poppind-Medium',
    borderRadius: normalize(20),
    ...Platform.select({
      ios: { padding: normalize(3) },
      android: {
        padding: normalize(5),
      },
    }),
  },
  rowAlign: {
    flexDirection: 'row',
  },
});

export { requestStyle };
