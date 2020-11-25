import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const smallHeaderStyle = StyleSheet.create({
  header: {
    color: colors.secondary,
    fontSize: normalize(theme.size.xs),
    fontFamily: fonts.mulishRegular,
  },

  subcontainer: {
    paddingVertical: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    marginHorizontal: normalize(10),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  leaveline: {
    width: '75%',
  },
});

export { smallHeaderStyle };
