import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const deleteAlertStyle = StyleSheet.create({
  dialogContainer: {
    width: '92%',
    borderRadius: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(20),
    paddingHorizontal: normalize(15),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: normalize(10),
  },
  text1: {
    fontSize: normalize(theme.size.md),
    fontFamily: fonts.mulishBold,
  },
  text2: {
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
    fontFamily: fonts.mulishRegular,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    ...Platform.select({
      ios: {
        paddingTop: normalize(10),
        paddingBottom: normalize(25),
      },
      android: {
        paddingTop: normalize(5),
        paddingBottom: normalize(5),
      },
    }),
  },
  cancel: {
    color: colors.black,
    fontSize: normalize(theme.size.sm),
    fontFamily: fonts.mulishBold,
    ...Platform.select({
      ios: {
        marginLeft: normalize(110),
      },
      android: {
        marginRight: normalize(10),
      },
    }),
  },
  delete: {
    color: colors.primary,
    fontFamily: fonts.mulishBold,
  },
  iconContainer: {
    backgroundColor: colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(8),
    borderRadius: normalize(50),
  },
});

export { deleteAlertStyle };
