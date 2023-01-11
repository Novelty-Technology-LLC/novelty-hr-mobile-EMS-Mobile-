import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const width = Dimensions.get('window').width;

const dialogContainerStyle = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    width: width * 0.84,
    borderRadius: normalize(5),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { dialogContainerStyle };
