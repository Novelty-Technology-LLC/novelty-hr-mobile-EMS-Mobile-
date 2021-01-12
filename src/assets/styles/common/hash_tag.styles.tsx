import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const hashtagStyle = StyleSheet.create({
  paidView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(10),
    backgroundColor: colors.buttonOrange,

    borderRadius: normalize(3),
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
        marginBottom: normalize(2),
        marginLeft: normalize(2),
      },
      android: {
        borderRadius: normalize(4),
        marginBottom: normalize(4),
        marginLeft: normalize(4),
      },
    }),
  },
  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(10),

    backgroundColor: colors.buttonGrey,
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
        marginBottom: normalize(2),
        marginLeft: normalize(2),
      },
      android: {
        borderRadius: normalize(4),
        marginBottom: normalize(4),
        marginLeft: normalize(4),
      },
    }),
  },
  buttonTextPaid: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.sm),
    color: colors.fontOrange,
  },
  buttonTextFloat: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(theme.size.sm),
    color: colors.fontGrey,
  },
});

export { hashtagStyle };
