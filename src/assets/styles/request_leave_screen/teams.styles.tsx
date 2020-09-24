import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme } from '../theme';

const teamStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  text: {
    paddingTop: normalize(19),
    paddingLeft: normalize(18),
    fontSize: theme.size.base,
  },
  scrollView: {
    flex: 1,
    paddingVertical: normalize(20),
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    marginLeft: normalize(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: { marginLeft: normalize(105) },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  nameView: {
    paddingTop: normalize(10),
  },
  name: {
    fontSize: theme.size.sm,
  },
});

export { teamStyle };
