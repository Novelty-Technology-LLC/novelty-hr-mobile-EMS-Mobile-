import { StyleSheet,Platform } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';
const requestWithImageStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: normalize(10),
  },
  image: {
    width: normalize(37),
    height: normalize(37),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  gap: {
    paddingRight: normalize(0),
  },
  name: {
    fontSize: normalize(theme.size.base),
    color: colors.fontBlack,
    fontFamily: fonts.mulishSemiBold,
    textTransform: 'capitalize',
  },
  date: {
 ...Platform.select({
android:{
  marginTop: normalize(17),
},ios:{
  marginTop: normalize(20),
}
 }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  type: {
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
    fontFamily: fonts.poppinsMedium,
    textTransform: 'uppercase',
    fontWeight: 'normal',
  },
  datetype: {
    fontSize: normalize(theme.size.xs),
    color: colors.fontGrey,
    fontFamily: fonts.mulishSemiBold,
    paddingLeft: normalize(3),
  },
});

export { requestWithImageStyle };
