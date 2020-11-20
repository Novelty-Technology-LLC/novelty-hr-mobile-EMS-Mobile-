import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const otherRequestsStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: normalize(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(20),
    paddingTop: normalize(20),
  },
});

export { otherRequestsStyle };
