import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme } from '../theme';

const leaveType = StyleSheet.create({
  main: {
    paddingBottom: normalize(15),
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: normalize(20),
    paddingTop: normalize(20),
  },
  text: {
    fontSize: theme.size.md,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: normalize(20),
  },
  paidView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(31),
    paddingVertical: normalize(15),
    backgroundColor: color.buttonOrange,
    borderRadius: normalize(3),
  },
  spacer: {
    paddingHorizontal: normalize(10),
  },
  floatingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(15),
    backgroundColor: color.buttonGrey,
    borderRadius: normalize(4),
  },
  buttonPaid: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonFloat: {
    color: color.fontGrey,
    fontSize: theme.size.sm,
  },
});

export { leaveType };
