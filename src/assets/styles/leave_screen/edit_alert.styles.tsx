import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const editAlertStyle = StyleSheet.create({
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '92%',
    borderRadius: normalize(4),
    paddingBottom: normalize(20),
    paddingHorizontal: normalize(20),
  },
  main: {
    width: '100%',
    paddingTop: normalize(20),
  },
  gap: { flex: 1 },
  semigap: { paddingVertical: normalize(5) },
  spacer: { paddingVertical: normalize(theme.spacing.wide) },
  spaceTop: { paddingTop: normalize(5) },
  titleView: {
    paddingBottom: normalize(15),
  },
  state: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(5),
  },
  icon: { marginLeft: normalize(5), color: colors.green },
  stateView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    ...Platform.select({
      ios: { paddingTop: normalize(2) },
      android: {
        paddingTop: normalize(5),
      },
    }),
  },
  title: {
    fontWeight: '700',
    fontSize: normalize(theme.size.base),
  },
  cancel: {
    color: colors.black,
    fontFamily: fonts.mulishBold,
  },
  delete: {
    color: colors.primary,
    fontFamily: fonts.mulishBold,
  },
  buttonGap: {
    ...Platform.select({
      ios: {
        marginHorizontal: normalize(85),
      },
    }),
  },
  buttons: {
    width: '100%',
    paddingTop: normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  note: {
    color: colors.secondary,
    paddingBottom: normalize(15),
    fontFamily: fonts.mulishRegular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: normalize(10),
  },
  textareaContainer: {
    height: normalize(140),
    borderRadius: normalize(3),
    backgroundColor: colors.grey,
    opacity: 0.8,
  },
  textArea: {
    height: normalize(130),
    textAlignVertical: 'top',
    padding: normalize(15),
  },
});

export { editAlertStyle };
