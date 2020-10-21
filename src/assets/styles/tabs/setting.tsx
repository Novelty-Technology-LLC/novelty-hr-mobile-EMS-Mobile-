import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const settingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comingSoonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  comingSoonText: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.xl),
    textAlign: 'center',
  },
});

export { settingStyle };
