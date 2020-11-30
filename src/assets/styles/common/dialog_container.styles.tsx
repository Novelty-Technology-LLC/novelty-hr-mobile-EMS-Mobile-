import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const width = Dimensions.get('window').width;

const dialogContainerStyle = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    width: width * 0.805,
    borderRadius: 5,
  },
  content: {
    marginLeft: normalize(-42),
    marginBottom: normalize(-20),
    marginTop: normalize(-17),
    alignSelf: 'center',
  },
});

export { dialogContainerStyle };
