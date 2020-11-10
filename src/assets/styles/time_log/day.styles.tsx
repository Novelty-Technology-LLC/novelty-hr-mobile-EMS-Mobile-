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
    width: '27%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(5),
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(10),
    borderRadius: normalize(3),
  },
  selectView: {
    backgroundColor: colors.buttonGrey,
  },
  selectText: {
    color: colors.fontGrey,
  },
  unselectView: {
    backgroundColor: colors.buttonOrange,
  },
  unselectText: {
    color: colors.fontOrange,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: normalize(15),
    paddingLeft: normalize(15),
  },
});

export { dayStyle };
