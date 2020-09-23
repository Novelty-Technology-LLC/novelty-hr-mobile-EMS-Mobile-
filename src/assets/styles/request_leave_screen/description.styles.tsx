import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';
import { theme } from '../theme';

const descriptionStyle = StyleSheet.create({
  main: {
    marginTop: normalize(20),
    marginLeft: normalize(20),
  },
  text: {
    fontSize: theme.size.lg,
  },
  textareaContainer: {
    height: normalize(140),
    width: normalize(340),
    marginTop: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: color.grey,
    opacity: 0.8,
  },
  textArea: {
    height: normalize(130),
    textAlignVertical: 'top',
  },
});

export { descriptionStyle };
