import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS == 'android' ? 'http://10.0.2.2:8088' : 'http://localhost:8088';

// export const BASE_URI = 'https://e1d40c002069.ngrok.io';
// export const COSMIC_URI = 'https://api.vitafyhealth.com/api/cosmic/';
