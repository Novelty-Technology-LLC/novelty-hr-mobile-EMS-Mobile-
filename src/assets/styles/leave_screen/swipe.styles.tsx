import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    marginRight: normalize(10),
  },
  tlcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(8),
    marginRight: normalize(10),
    paddingHorizontal: normalize(10),
  },

  othercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    marginRight: normalize(10),
  },
});

export { swipeStyle };
