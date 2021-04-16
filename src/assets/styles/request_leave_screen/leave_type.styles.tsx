import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { theme, fonts, color } from '../theme';

const leaveType = StyleSheet.create({
  container: {},
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: normalize(15),
    marginBottom: normalize(5),
  },
  padNone: {
    marginBottom: normalize(0),
    // marginHorizontal: normalize(15),
    paddingTop: normalize(10),
  },
  text: {
    fontFamily: fonts.poppinsMedium,
    fontSize: normalize(theme.size.md),
    marginBottom: normalize(15),
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  requestBody: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(5),
  },
  button: {
    width: '48%',
    marginBottom: normalize(15),
  },
  editdate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: normalize(15),
  },
  projectbutton: {
    ...Platform.select({
      ios: {
        width: '31%',
      },
      android: {
        width: '32%',
      },
    }),
    marginBottom: normalize(10),
  },

  spacer: {
    ...Platform.select({
      ios: {
        paddingHorizontal: normalize(3),
      },
      android: {
        paddingHorizontal: normalize(5),
      },
    }),
  },

  moreContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export { leaveType };
