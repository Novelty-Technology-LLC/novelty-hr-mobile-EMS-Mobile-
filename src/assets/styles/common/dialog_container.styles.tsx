import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const width = Dimensions.get('window').width;

const dialogContainerStyle = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    width: width * 0.82,
    borderRadius: 5,
  },
  content: {
    marginLeft: -width * 0.094,
    marginBottom: -width * 0.046,
    marginTop: -width * 0.036,
    alignSelf: 'center',
  },
});

export { dialogContainerStyle };
