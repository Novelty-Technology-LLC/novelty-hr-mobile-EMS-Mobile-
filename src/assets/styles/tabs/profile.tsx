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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: normalize(6),
    borderColor: colors.white,
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
    paddingBottom: normalize(10),
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  msg: {
    paddingLeft: normalize(10),
    ...Platform.select({
      ios: {
        paddingTop: normalize(5),
      },
      android: {
        paddingTop: normalize(7),
      },
    }),
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
  designation: {
    marginLeft: normalize(10),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      android: {
        marginTop: normalize(8),
      },
      ios: {
        marginTop: normalize(5),
      },
    }),
  },
  date: {
    marginLeft: normalize(6),
    fontFamily: fonts.poppinsRegular,
    ...Platform.select({
      ios: {
        marginTop: normalize(7),
      },
      android: {
        marginTop: normalize(10),
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
