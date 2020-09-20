import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';

const leaveType = StyleSheet.create({
  main: {
    height: normalize(140),
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: normalize(20),
    paddingTop: normalize(20),
  },
  text: {
    fontSize: normalize(18),
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: normalize(20),
  },
  paidView: {
    width: normalize(160),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(15),
    backgroundColor: color.buttonOrange,
    borderRadius: normalize(3),
  },
  spacer: {
    paddingHorizontal: normalize(10),
  },
  floatingView: {
    width: normalize(160),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(15),
    backgroundColor: color.buttonGrey,
    borderRadius: normalize(3),
  },
  buttonPaid: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonFloat: {
    color: color.fontGrey,
    fontSize: normalize(13),
  },
});

export { leaveType };
