import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const hashtagStyle = StyleSheet.create({
  tagwrapper : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(7),
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
    })
  },
  paidView: {
    backgroundColor: colors.buttonOrange,
  },
  floatingView: {
    backgroundColor: colors.buttonGrey,
  },
  buttonText: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(13),
  },
  buttonTextPaid: {
    color: colors.fontOrange,
  },
  buttonTextFloat: {
    color: colors.fontGrey,
  },
});

export { hashtagStyle };
