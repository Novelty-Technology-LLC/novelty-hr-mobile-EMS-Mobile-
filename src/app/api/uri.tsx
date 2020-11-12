// export const BASE_URI = 'https://novelty-hr-api.herokuapp.com/';
import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS === 'android' ? 'http://10.0.2.2:8088' : 'http://127.0.0.1:8088';
