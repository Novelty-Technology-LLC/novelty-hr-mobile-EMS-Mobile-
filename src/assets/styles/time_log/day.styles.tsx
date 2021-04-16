import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

const dayStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: normalize(18),
    fontFamily: fonts.mulishBold,
  },
  container: {
    width: Platform.OS === 'ios' ? '30%' : '32%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(8),
    borderRadius: normalize(3),
  },
  selectView: {
    backgroundColor: colors.buttonGrey,
    flexDirection: 'row',
  },
  selectText: {
    color: colors.fontGrey,
  },
  unselectView: {
    backgroundColor: colors.buttonOrange,
    flexDirection: 'row',
  },
  unselectText: {
    color: colors.fontOrange,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: normalize(12),
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  gap: {
    paddingHorizontal: normalize(4),
  },
});

export { dayStyle };
