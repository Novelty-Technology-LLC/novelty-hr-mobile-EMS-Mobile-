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
    fontFamily: fonts.mulishRegular,
    color: colors.secondary,
    fontSize: normalize(theme.size.xs),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    width: normalize(10),
  },
  bgap: { paddingVertical: normalize(60) },
});

export { myRequestsStyle };
