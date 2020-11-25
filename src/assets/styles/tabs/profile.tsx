import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageView: {
    paddingVertical: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  confirm: {
    flexDirection: 'row',
  },
  spacer: {
    marginHorizontal: normalize(10),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  labelText: {
    fontFamily: fonts.mulishRegular,
    color: colors.white,
    marginLeft: normalize(2),
    fontSize: normalize(theme.size.base),
  },
  infoView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: normalize(15),
    paddingHorizontal: normalize(15),
  },
  heading: {
    fontFamily: fonts.poppinsMedium,
    color: colors.black,
    fontSize: normalize(theme.size.base),
  },
  body: {
    width: '100%',
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingBottom: normalize(10),
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(15),
  },
  gender: {
    textTransform: 'capitalize',
    marginLeft: normalize(8),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(5),
      },
    }),
  },
  text: {
    marginLeft: normalize(8),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(5),
      },
    }),
  },

  date: {
    marginLeft: normalize(8),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      ios: {
        marginTop: normalize(7),
      },
      android: {
        marginTop: normalize(12),
      },
    }),
  },
  modalCalender: {
    width: '95%',
    alignItems: 'center',
    paddingBottom: normalize(25),
  },
});

export { profileStyle };
