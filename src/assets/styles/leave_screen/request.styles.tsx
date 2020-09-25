import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const requestStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: normalize(20),
    paddingLeft: normalize(15),
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
    color: colors.secondary,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium,
  },
  icon: {
    transform: [{ rotate: '-40deg' }],
    backgroundColor: colors.primary,
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
    marginTop: normalize(20),
  },
  buttonSpacer: { marginLeft: normalize(theme.spacing.wider) },
  buttonViewApprove: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    alignItems: 'center',
    fontSize: normalize(theme.size.xs),
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(6),
      },
    }),
  },
  buttonViewDeny: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: normalize(theme.size.xs),
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(6),
      },
    }),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonApprove: {
    color: colors.white,
  },
  buttonDeny: {
    color: colors.primary,
  },
  subcontainer: {
    width: normalize(200),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
    paddingRight: normalize(18),
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
});

export { requestStyle };
