import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const dayStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: normalize(theme.size.sm),
    fontFamily: fonts.mulishBold,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: normalize(5),
    ...Platform.select({
      android: { padding: normalize(10), borderRadius: normalize(5) },
      ios: { padding: normalize(9), borderRadius: normalize(3) }
    })
  },
  selectView: {
    backgroundColor: colors.buttonGrey,
    flexDirection: 'row',
  },
  selectText: {
    color: colors.fontGrey,
  },
  unselectView: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  unselectText: {
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  gap: {
    paddingHorizontal: normalize(4),
  },
});

export { dayStyle };
