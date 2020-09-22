import { StyleSheet } from 'react-native';
import colors from '../../colors';
import { theme } from '../theme';
import normalize from 'react-native-normalize';

const approveRequest = StyleSheet.create({
  headerDate: {
    color: colors.fontGrey,
    fontSize: theme.size.xs,
    marginLeft: normalize(theme.spacing.wider),
  },
});

export { approveRequest };
