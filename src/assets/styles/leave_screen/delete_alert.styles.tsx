import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const deleteAlertStyle = StyleSheet.create({
  dialogContainer: {
    width: '92%',
    borderRadius: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(20),
    paddingHorizontal: normalize(15),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: normalize(10),
  },
  text1: {
    fontSize: normalize(19),
  },
  text2: {
    fontSize: normalize(13),
    color: colors.fontGrey,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    ...Platform.select({
      ios: {
        paddingTop: normalize(10),
        paddingBottom: normalize(25),
      },
      android: {
        paddingTop: normalize(5),
        paddingBottom: normalize(5),
      },
    }),
  },
  cancel: {
    color: colors.black,
    fontSize: normalize(15),
    ...Platform.select({
      ios: {
        marginLeft: normalize(110),
      },
      android: {
        marginRight: normalize(10),
      },
    }),
  },
  delete: {
    color: colors.primary,
  },
  iconContainer: {
    backgroundColor: colors.snow,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export { deleteAlertStyle };
