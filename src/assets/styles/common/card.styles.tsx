import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

const cardStyle = StyleSheet.create({
  container: { flexDirection: 'column', marginTop: normalize(40) },
  module: { marginLeft: normalize(20), marginTop: normalize(10) },
  textContainer: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    fontFamily: fonts.mulishBold,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 6,
    fontFamily: fonts.poppinsMedium,
    color: colors.fontGrey,
  },
});

export { cardStyle };
