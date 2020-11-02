import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    marginRight: normalize(10),
  },
  othercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(8),
    marginRight: normalize(10),
  },
});

export { swipeStyle };
