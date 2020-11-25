import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const selectButtonStyle = StyleSheet.create({
  paidView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(15),
    backgroundColor: colors.buttonOrange,
    borderRadius: normalize(3),
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(4),
      },
    }),
  },
  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(15),
    backgroundColor: colors.buttonGrey,
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(4),
      },
    }),
  },
  timelogicon: {
    position: 'absolute',
    zIndex: 3,
    top: normalize(15),
    left: '5%',
    ...Platform.select({
      android: {
        marginTop: normalize(5),
      },
      ios: {
        marginTop: normalize(2),
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

export { selectButtonStyle };
