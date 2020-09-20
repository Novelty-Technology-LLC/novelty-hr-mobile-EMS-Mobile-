import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';

const descriptionStyle = StyleSheet.create({
  main: {
    marginTop: normalize(20),
    marginLeft: normalize(20),
  },
  text: {
    fontSize: normalize(18),
  },
  textareaContainer: {
    width: normalize(340),
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
});

export { descriptionStyle };
