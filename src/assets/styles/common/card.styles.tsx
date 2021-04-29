import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

const cardStyle = StyleSheet.create({
  container: { flexDirection: 'column', marginTop: normalize(40) },
  module: { marginTop: normalize(10) },
  textContainer: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
  },
  title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 6,
  },
  titleText: {
    fontFamily: fonts.mulishBold,
  },
  subTitleText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(12),
    color: colors.fontGrey,
  },
  indicator: { position: 'absolute', top: normalize(17), right: normalize(0) },
  detailIndicator: {
    marginRight: normalize(5),
    marginTop: normalize(5),
    alignSelf: 'flex-start',
  },
});

export { cardStyle };
