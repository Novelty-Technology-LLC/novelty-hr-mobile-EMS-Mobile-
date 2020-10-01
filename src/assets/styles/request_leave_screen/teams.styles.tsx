import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme, fonts } from '../theme';

const teamStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },

  text: {
    paddingTop: normalize(19),
    paddingLeft: normalize(18),
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
  },
  scrollView: {
    flex: 1,
    paddingVertical: normalize(20),
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    marginLeft: normalize(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: { marginLeft: normalize(105) },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  nameView: {
    paddingTop: normalize(10),
  },
  name: {
    fontSize: normalize(theme.size.sm),
    fontFamily: fonts.mulishRegular,
  },
});

export { teamStyle };
