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
    width: 'auto',
  },
  error:{
    color:color.red,
    paddingTop:normalize(10),
    marginLeft:normalize(15)
  },
  buttonView: {
    marginTop: normalize(23),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingVertical: normalize(2),
    marginHorizontal: normalize(19),
    marginBottom: normalize(20),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        borderRadius: normalize(4),
      },
      android: {
        borderRadius: normalize(5),
      },
    }),
  },

  buttonText: {
    fontFamily: fonts.mulishBold,
    paddingVertical: normalize(20),
    color: color.white,
    fontSize: normalize(theme.size.base),
  },
});

export { requestLeave };
