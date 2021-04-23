import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

const listStyle = StyleSheet.create({
  header: {
    fontFamily: fonts.PoppinsSemibold,
    textTransform: 'uppercase',
    marginBottom: normalize(10),
    fontSize: normalize(14),
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightbrown,
    borderRadius: normalize(8),
    padding: normalize(10),
  },
  seeAll: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: normalize(10),
    right: normalize(10),
  },
  seeAllText: {
    fontFamily: fonts.poppinsRegular,
    color: colors.primary,
    marginRight: normalize(5),
  },
  itemContainer: {
    width: '100%',
    borderBottomColor: colors.brown,
    paddingVertical: normalize(8),
  },
  title: {
    fontFamily: fonts.mulishBold,
    marginVertical: normalize(5),
    fontSize: normalize(16),
  },
  subTitle: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(14),
    color: colors.fontGrey,
  },
});

export { listStyle };
