import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS === 'ios'
    ? 'http://127.0.0.1:8080'
    : 'http://60033ed05b28.ngrok.io';
