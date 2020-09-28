import { theme, fonts } from '../theme';
import color from '../../colors';
import normalize from 'react-native-normalize';

const headerText = {
  fontFamily: fonts.poppinsMedium,
  fontSize: normalize(theme.size.lg),
  color: color.primary,
};

export { headerText };
