import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts, theme } from '../theme';

const smallHeaderStyle = StyleSheet.create({
  header: {
    color: colors.secondary,
    fontSize: normalize(13),
    fontFamily: fonts.mulishRegular,
  },
  subcontainer: {
    paddingVertical: normalize(theme.size.xs),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  historyContainer: {
    width: '75%',
  },
  historyTimelogContainer: {
    width: '88%',
  },
  line: {
    flexGrow: 1,
    marginLeft: normalize(10),
    marginRight: normalize(10),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});

export { smallHeaderStyle };
