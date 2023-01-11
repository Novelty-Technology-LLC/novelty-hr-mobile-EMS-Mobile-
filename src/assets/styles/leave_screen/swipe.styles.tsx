import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: normalize(5),
  },
  tlcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
