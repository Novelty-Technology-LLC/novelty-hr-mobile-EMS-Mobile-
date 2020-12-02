import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const width = Dimensions.get('window').width;

const timeLogStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.snow,
    paddingRight: normalize(10),
    borderRadius: 2,
    marginVertical: 7,
  },
  dateView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: normalize(3),
  },
  date: {
    width: '75%',
    fontSize: normalize(theme.size.base),
    color: colors.black,
    fontFamily: fonts.mulishBold,
  },
  rldate: {
    fontFamily: fonts.poppinsMedium,
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
  },
  type: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.sm),
    fontFamily: fonts.poppinsMedium,
    marginTop: normalize(7),
  },
  cdate: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium,
    marginTop: normalize(7),
  },
  rdate: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium,
    marginTop: normalize(7),
  },
  duration: {
    fontSize: normalize(theme.size.md),
    color: colors.primary,
    fontFamily: fonts.mulishBold,
    marginTop: normalize(5),
  },
  gap: {
    marginRight: normalize(10),
  },
  text: {
    fontFamily: fonts.mulishRegular,
    fontSize: normalize(theme.size.xxs),
    color: colors.fontGrey,
    paddingTop: normalize(theme.spacing.wide),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCalender: {
    width: width * 0.8,
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    marginTop: 10,
  },
  indicator: {
    width: normalize(8),
    height: normalize(8),
    backgroundColor: colors.yellow,
    borderRadius: normalize(5),
    alignSelf: 'center',
    marginRight: normalize(5),
    marginBottom: normalize(3),
  },
});

export { timeLogStyle };
