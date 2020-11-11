import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme, fonts } from '../theme';

const descriptionStyle = StyleSheet.create({
  main: {
    marginTop: normalize(20),
    marginLeft: normalize(20),
    paddingBottom: normalize(10),
  },
  alertmain: {
    marginLeft: normalize(20),
  },
  text: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
  },
  textareaContainer: {
    height: normalize(140),
    width: normalize(340),
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  editlogContainer: {
    height: normalize(100),
    width: '93%',
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  textinputContainer: {
    height: normalize(60),
    width: normalize(340),
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  textinputTime: {
    height: normalize(60),
    width: normalize(80),
    marginVertical: normalize(10),
    paddingHorizontal: normalize(28),
    paddingVertical: normalize(15),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  iospicker: { height: 200, width: 125 },
  colon: {
    fontSize: normalize(18),
    paddingHorizontal: normalize(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    height: normalize(130),
    textAlignVertical: 'top',
  },
  error: { paddingTop: normalize(10), color: color.red },
  dark: {},
});

export { descriptionStyle };
