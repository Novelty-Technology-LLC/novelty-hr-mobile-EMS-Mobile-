import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const requestWithImageStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(25),
    marginRight: normalize(10),
  },
  gap: {
    paddingRight: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  date: { flexDirection: 'row', paddingTop: normalize(5) },
  type: {
    fontSize: normalize(12),
    opacity: 0.4,
  },
});

export { requestWithImageStyle };