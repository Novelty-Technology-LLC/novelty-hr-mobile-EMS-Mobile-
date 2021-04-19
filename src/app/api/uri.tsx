import { Platform } from 'react-native';

export const BASE_URI =
  Platform.OS === 'android' ? 'http://10.0.2.2:8088' : 'http://127.0.0.1:8088';
// export const BASE_URI = 'https://employee-mgmt-api-dev.herokuapp.com/';

// export const BASE_URI = 'https://64f52fe4e0b0.ngrok.io';

export const COSMIC_URI = 'https://api.vitafyhealth.com/api/cosmic/';
