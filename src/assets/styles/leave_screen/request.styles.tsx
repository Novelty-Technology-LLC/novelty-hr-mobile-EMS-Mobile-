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
    fontSize: theme.size.xxs,
    fontFamily: fonts.mulishRegular,
    color: colors.fontGrey,
  },
  date: {
    fontWeight: 'bold',
    fontSize: theme.size.md,
  },
  text: {
    fontFamily: fonts.mulishRegular,
    fontSize: theme.size.xxs,
    color: colors.fontGrey,
  },
  type: {
    color: colors.secondary,
    fontSize: theme.size.xs,
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
    paddingRight: normalize(10),
  },
  days: {
    color: colors.secondary,
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
    backgroundColor: colors.primary,
    fontFamily: 'Poppind-Medium',
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
