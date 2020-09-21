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
  buttonView: {
    marginTop: normalize(23),
    marginHorizontal: normalize(20),
    paddingVertical: normalize(15),
    borderRadius: normalize(6),
    marginBottom: normalize(10),
    backgroundColor: color.primary,
    display: 'flex',
  },
  buttonText: {
    color: color.white,
    alignSelf: 'center',
    fontSize: normalize(16),
  },
});

export { requestLeave };