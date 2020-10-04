import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS == 'ios'
    ? 'http://127.0.0.1:8080'
    : 'https://6c275db83008.ngrok.io';
