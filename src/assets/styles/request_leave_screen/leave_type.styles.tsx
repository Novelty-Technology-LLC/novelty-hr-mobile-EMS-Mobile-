import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

import { theme, fonts } from '../theme';

const leaveType = StyleSheet.create({
  container: { borderBottomWidth: 1, borderBottomColor: colors.border },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(20),
  },
  padNone: {
    paddingBottom: normalize(0),
    marginBottom: normalize(0),
  },
  text: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
    marginBottom: normalize(15),
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: normalize(20),
    flexWrap: 'wrap',
  },
  requestBody: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: '48%',
    marginBottom: normalize(15),
  },

  paidView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    backgroundColor: colors.buttonOrange,
    borderRadius: normalize(3),
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(20),
        borderRadius: normalize(3),
      },
      android: {
        paddingHorizontal: normalize(30),
        borderRadius: normalize(4),
      },
    }),
  },
  spacer: {
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(5),
      },
      android: {
        paddingHorizontal: normalize(8),
      },
    }),
  },

  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    backgroundColor: colors.buttonGrey,
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(20),
        borderRadius: normalize(3),
      },
      android: {
        paddingHorizontal: normalize(30),
        borderRadius: normalize(4),
      },
    }),
  },

  icon: {
    height: 20,
    width: 25,
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

export { leaveType };
