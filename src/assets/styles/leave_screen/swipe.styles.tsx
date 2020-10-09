import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const swipeStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(8),
    marginRight: normalize(10),
  },
});

export { swipeStyle };
