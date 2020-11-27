import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const width = Dimensions.get('window').width;

const dialogContainerStyle = StyleSheet.create({
  dialog: { width: width * 0.9, alignSelf: 'center' },
  content: {
    marginLeft: normalize(-35),
    marginBottom: normalize(-20),
    marginTop: normalize(-15),
    alignSelf: 'center',
  },
});

export { dialogContainerStyle };
