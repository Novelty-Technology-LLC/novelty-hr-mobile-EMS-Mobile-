import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const listStyle = StyleSheet.create({
  header: {
    fontFamily: fonts.PoppinsSemibold,
    textTransform: 'uppercase',
    marginBottom: normalize(10),
    fontSize: normalize(theme.size.normal),
  },
  container: {
    backgroundColor: colors.lightbrown,
    borderRadius: normalize(8),
    padding: normalize(10),
    paddingTop: normalize(0),
    flexGrow: 1
  },
  seeAll: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: normalize(5),
    right: normalize(5),
  },
  seeAllText: {
    fontFamily: fonts.poppinsRegular,
    color: colors.primary,
    marginRight: normalize(5),
    fontSize: normalize(12),
  },
  itemContainer: {
    width: '100%',
    borderBottomColor: colors.brown,
    paddingVertical: normalize(10),
  },
});

export { listStyle };
