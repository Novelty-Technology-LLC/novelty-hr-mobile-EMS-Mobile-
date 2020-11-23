import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts } from '../theme';

const myRequestsStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: normalize(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(20),
    marginTop: normalize(20),
  },
  logheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(20),
  },
  title: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.lg),
    color: colors.black,
  },
  history: {
    fontFamily: fonts.poppinsMedium,
    color: colors.secondary,
    fontSize: normalize(theme.size.base),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    width: normalize(10),
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(35),
    borderRadius: 2,
    backgroundColor: colors.snow,
  },
  emptyText: {
    color: colors.secondary,
  },
  bgap: { paddingVertical: normalize(60) },
});

export { myRequestsStyle };
