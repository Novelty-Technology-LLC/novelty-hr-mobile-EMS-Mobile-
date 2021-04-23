import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

const holidayListingStyle = StyleSheet.create({
  container: {
    marginHorizontal: normalize(20),
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.lightGrey,
  },
  title: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(18),
  },
  subTitle: {
    fontFamily: fonts.mulishBold,
    fontSize: normalize(14),
    color: colors.fontGrey,
  },
  mainContainer: { flex: 1, backgroundColor: colors.white },
});

export { holidayListingStyle };
