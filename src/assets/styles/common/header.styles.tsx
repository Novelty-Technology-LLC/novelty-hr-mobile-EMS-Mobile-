import { Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
const { width, height } = Dimensions.get('window');

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
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    zIndex: 3,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { headerStyle };
