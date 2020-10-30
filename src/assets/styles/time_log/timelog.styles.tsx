import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const timeLogStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: normalize(15),
    marginRight: normalize(20),
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
  date: {
    width: '75%',
    fontSize: normalize(theme.size.base),
    color: colors.black,
    fontFamily: fonts.mulishBold,
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
  duration: {
    fontSize: normalize(theme.size.md),
    color: colors.primary,
    fontFamily: fonts.mulishBold,
    marginTop: normalize(5),
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
});

export { timeLogStyle };
