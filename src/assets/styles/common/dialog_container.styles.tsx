import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const dialogContainerStyle = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    width: width * 0.84,
    borderRadius: 5,
  },
  content: {
    marginLeft: -width * 0.08,
    marginBottom: -width * 0.046,
    marginTop: -width * 0.036,
    alignSelf: 'center',
  },
});

export { dialogContainerStyle };
