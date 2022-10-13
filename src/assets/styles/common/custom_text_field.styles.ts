import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { fonts, theme } from '../theme';

export const customTextFieldStyles = StyleSheet.create({
  textinputContainer: {
    marginBottom: normalize(25),
  },
  innerContainer: {
    minHeight: normalize(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.grey,
  },
  icon: {
    color: color.primary,
    fontSize: 22,
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    padding: normalize(10),
    opacity: 0.8,
    borderWidth: 0,
    color: color.black,
    fontFamily: fonts.mulishRegular,

  },
  error: {
    paddingTop: normalize(10),
    color: color.red,
    fontSize: normalize(theme.size.normal),
  },
});
