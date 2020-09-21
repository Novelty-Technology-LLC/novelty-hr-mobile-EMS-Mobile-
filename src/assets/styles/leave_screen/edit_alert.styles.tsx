import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

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
  titleView: {
    paddingBottom: normalize(15),
  },
  title: {
    fontWeight: '700',
  },
  cancel: {
    color: colors.black,
    fontWeight: 'bold',
  },
  delete: {
    color: colors.primary,
    fontWeight: 'bold',
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