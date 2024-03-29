import { Platform, StyleSheet } from 'react-native';
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
    marginTop: normalize(10),
    alignContent: 'center',
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
    width: normalize(5),
  },
  bgap: { paddingVertical: normalize(60) },
  dropDownView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: normalize(10),

    ...Platform.select({
      ios: {
        zIndex: 100,
      },
    }),
  },
  dropDown: {
    paddingHorizontal: normalize(10),
  },
  dropDownWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    padding: normalize(40),
    ...Platform.select({
      ios: {
        zIndex: 1000,
      },
    }),
  },
});

export { myRequestsStyle };
