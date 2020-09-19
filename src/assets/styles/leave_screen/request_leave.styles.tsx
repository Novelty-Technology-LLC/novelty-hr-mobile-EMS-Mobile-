import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';

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
});

export { requestLeave };
