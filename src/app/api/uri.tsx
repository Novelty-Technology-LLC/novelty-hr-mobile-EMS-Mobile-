import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS == 'ios'
    ? 'http://127.0.0.1:8088'
    : 'https://2f51f99fbcf3.ngrok.io';
