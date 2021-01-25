import { StyleSheet, Platform, Dimensions } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme, fonts } from '../theme';
const deviceHeight = Dimensions.get('window').height;

const descriptionStyle = StyleSheet.create({
  hashtag: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: normalize(5),
  },
  main: {
    marginTop: normalize(20),
    paddingBottom: normalize(10),
    marginHorizontal: normalize(15),
  },
  pickerContainer: {
    marginHorizontal: normalize(20),
    overflow: 'hidden',
    ...Platform.select({
      android: {
        height: deviceHeight * 0.13,
      },
      ios: {
        height: deviceHeight * 0.1,
      },
    }),
  },
  modalPickerContainer: {
    marginHorizontal: normalize(15),
    height: deviceHeight * 0.17,
    marginVertical: normalize(10),
  },
  alertmain: {
    marginHorizontal: normalize(20),
  },
  text: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
    marginTop: normalize(10),
  },
  textareaContainer: {
    height: normalize(140),
    width: '100%',
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  editlogContainer: {
    height: normalize(80),
    width: '99%',
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  textinputContainer: {
    height: normalize(80),
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
  iospicker: {
    width: '40%',
    ...Platform.select({
      android: {
        height: '220%',
        marginTop: normalize(
          deviceHeight <= 592 && deviceHeight >= 535
            ? -59
            : deviceHeight <= 534
            ? -90
            : -39
        ),
      },
      ios: {
        paddingVertical: normalize(30),
        marginTop: normalize(-39),
      },
    }),
  },
  timeSeparator: {
    width: '10%',
    ...Platform.select({
      ios: { marginBottom: normalize(40), paddingLeft: normalize(8) },
      android: {
        marginBottom: normalize(30),
        paddingLeft: normalize(10),
      },
    }),
  },
  colon: {
    fontSize: normalize(24),
    paddingHorizontal: normalize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        height: '95%',
        marginTop: normalize(5),
      },
      android: {
        height: normalize(70),
        marginTop: normalize(14),
      },
    }),
  },

  textArea: {
    height: normalize(130),
    textAlignVertical: 'top',
  },
  error: { paddingVertical: normalize(10), color: color.red },
  time: { paddingHorizontal: normalize(15) },
  dark: {},
});

export { descriptionStyle };
