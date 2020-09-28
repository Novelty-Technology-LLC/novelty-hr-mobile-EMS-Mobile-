import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme, fonts } from '../theme';

const requestLeave = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  calendar: {
    paddingVertical: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '100%',
  },
  buttonView: {
    marginTop: normalize(23),
    display: 'flex',
    marginBottom: normalize(20),
  },
  buttonText: {
    backgroundColor: color.primary,
    fontFamily: fonts.mulishBold,
    paddingVertical: normalize(20),
    color: color.white,
    alignSelf: 'center',
    overflow: 'hidden',
    fontSize: normalize(theme.size.base),
    ...Platform.select({
      ios: {
        borderRadius: normalize(4),
        paddingHorizontal: normalize(105),
      },
      android: {
        borderRadius: normalize(5),
        paddingHorizontal: normalize(115),
      },
    }),
  },
});

export { requestLeave };
