import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import { theme, fonts } from '../theme';
import color from '../../colors';

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  imageView: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },

  imageText: {
    fontFamily: fonts.PoppinsSemibold,
    fontSize: normalize(theme.size.logo),
    marginTop: normalize(theme.spacing.logo),
  },
  buttonView: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.lg),
  },

  message: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.normal),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalize(40),
    textAlign: 'center',
  },
  loginView: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  iconView: {
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  footerView: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  footerText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: normalize(theme.size.xs),
  },
});

export { loginStyle };
