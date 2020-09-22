import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { color } from '../theme';

const requestStyle = StyleSheet.create({
  container: {
    paddingVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: normalize(20),
    paddingLeft: normalize(15),
    marginRight: normalize(20),
    backgroundColor: colors.snow,
    paddingRight: normalize(10),
    borderRadius: 2,
    marginVertical: 7,
  },
  date: {
    fontWeight: 'bold',
    fontSize: normalize(18),
  },
  type: {
    color: colors.secondary,
    fontSize: normalize(12),
  },
  state: {
    color: colors.secondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    paddingHorizontal: normalize(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(30),
  },
  buttonSpacer: { marginLeft: normalize(15) },
  buttonViewApprove: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(6),
      },
    }),
  },
  buttonViewDeny: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: normalize(3),
      },
      android: {
        borderRadius: normalize(6),
      },
    }),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonApprove: {
    color: colors.white,
  },
  buttonDeny: {
    color: colors.primary,
  },
  subcontainer: {
    width: normalize(200),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
    paddingRight: normalize(20),
  },
  days: {
    color: colors.secondary,
  },
});

export { requestStyle };
