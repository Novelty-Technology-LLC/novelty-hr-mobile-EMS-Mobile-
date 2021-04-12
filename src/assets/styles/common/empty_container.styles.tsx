import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

const emptyContainerStyle = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(18),
    borderRadius: 2,
    backgroundColor: colors.snow,
  },
  emptyText: {
    color: colors.secondary,
  },
});

export { emptyContainerStyle };
