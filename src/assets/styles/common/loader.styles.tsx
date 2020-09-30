import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const loaderStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(20),
  },
});

export { loaderStyle };
