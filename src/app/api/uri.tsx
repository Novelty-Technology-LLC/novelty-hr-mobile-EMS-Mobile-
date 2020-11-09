import { Platform } from 'react-native';
export const BASE_URI =
  Platform.OS === 'android' ? 'http://10.0.2.2:8088' : 'http://127.0.0.1:8088';
// export const BASE_URI = 'https://b459cdddf5fb.ngrok.io';

// export const BASE_URI = 'https://novelty-hr-api.herokuapp.com/';
// export const BASE_URI = 'https://414e060c7fb9.ngrok.io';

// export const COSMIC_URI = 'https://api.vitafyhealth.com/api/cosmic/';
