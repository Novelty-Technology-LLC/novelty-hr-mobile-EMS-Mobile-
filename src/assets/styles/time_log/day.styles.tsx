import { StyleSheet } from 'react-native';
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
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(5),
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(10),
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
    paddingVertical: normalize(15),
    marginHorizontal: '2%',
  },
  gap: {
    // paddingHorizontal: normalize(8),
  },
});

export { dayStyle };
