import { Platform, StyleSheet } from 'react-native';
import colors from '../../colors';
import { theme } from '../theme';
import normalize from 'react-native-normalize';

const approveRequest = StyleSheet.create({
  headerDate: {
    color: colors.fontGrey,
    fontSize: theme.size.xs,
    marginLeft: normalize(theme.spacing.wider),
    ...Platform.select({
      ios: { marginTop: normalize(5) },
      android: {
        marginTop: normalize(8),
      },
    }),
  },
});

export { approveRequest };
