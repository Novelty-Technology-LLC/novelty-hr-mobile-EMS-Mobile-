import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const otherRequestsStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: normalize(15),
    paddingBottom: normalize(50),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: normalize(20),
  },
});

export { otherRequestsStyle };
