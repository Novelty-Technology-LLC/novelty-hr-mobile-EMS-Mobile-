import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const teamStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(180),
  },
  text: {
    paddingLeft: normalize(18),
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
  },
  scrollView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    marginLeft: normalize(15),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: { marginLeft: normalize(0) },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(50),
    marginRight: normalize(10),
  },
  nameView: {
    paddingTop: normalize(5),
  },
  name: {
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.mulishRegular,
  },
  iconContainer: {
    position: 'absolute',
    right: 6,
    top: 2,
    zIndex: 2,
    backgroundColor: colors.white,
    borderRadius: normalize(30),
  },
});

export { teamStyle };
