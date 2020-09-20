import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';

const teamStyle = StyleSheet.create({
  container: {
    height: normalize(150, 'height'),
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
    fontSize: normalize(16),
  },
  scrollView: {
    width: normalize(375),
  },
  wrapper: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    width: normalize(100),
    marginLeft: normalize(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  nameView: {
    paddingTop: normalize(10),
    height: normalize(30),
  },
  name: {
    fontSize: normalize(13),
  },
});

export { teamStyle };
