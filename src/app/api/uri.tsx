import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS == 'ios'
    ? 'http://127.0.0.1:8080'
    : 'http://c37cca4ca06d.ngrok.io';
