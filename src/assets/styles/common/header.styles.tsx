import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const headerStyle = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },

  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { headerStyle };
