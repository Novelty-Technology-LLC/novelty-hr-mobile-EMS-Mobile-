import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS == 'ios'
    ? 'http://127.0.0.1:8080'
    : ' http://96d514eed853.ngrok.io';
