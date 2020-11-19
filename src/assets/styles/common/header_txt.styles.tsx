import { theme, fonts } from '../theme';
import color from '../../colors';
import normalize from 'react-native-normalize';
import { Platform } from 'react-native';

const headerText = {
  fontFamily: fonts.poppinsMedium,
  fontSize: normalize(theme.size.lg),
  color: color.primary,
  textTransform: 'uppercase',
  ...Platform.select({
    android: {
      paddingTop: normalize(5),
    },
  }),
};

export { headerText };
