import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const dialogContainerStyle = StyleSheet.create({
  dialog: { width: '95%', alignSelf: 'center' },
  content: {
    marginLeft: normalize(-20),
    marginBottom: normalize(-20),
    marginTop: normalize(-15),
  },
});

export { dialogContainerStyle };
