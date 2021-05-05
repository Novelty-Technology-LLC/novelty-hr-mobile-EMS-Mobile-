import { Dimensions, Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const width = Dimensions.get('window').width;

const timeLogStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.snow,
    paddingHorizontal: normalize(10),
    borderRadius: 2,
    marginBottom: normalize(5),
  },
  dateView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: normalize(3),
  },
  date: {
    fontSize: normalize(theme.size.sm),
    color: colors.black,
    fontFamily: fonts.mulishBold,
    textTransform: 'capitalize'
  },
  rldate: {
    fontFamily: fonts.poppinsMedium,
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    alignSelf: 'flex-start'
  },
  type: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium
  },
  cdate: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium
  },
  rdate: {
    color: colors.fontGrey,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.poppinsMedium,
    marginTop: normalize(7),
  },
  duration: {
    fontSize: normalize(theme.size.sm),
    color: colors.primary,
    fontFamily: fonts.mulishBold,
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
    alignItems: 'center',
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
    width: normalize(10),
    height: normalize(10),
    backgroundColor: colors.yellow,
    borderRadius: normalize(8),
    alignSelf: 'center',
    marginRight: normalize(5),
    marginLeft: normalize(5),
    ...Platform.select({
      android: {
        marginBottom: normalize(3),
      },
    }),
  },
});

export { timeLogStyle };
