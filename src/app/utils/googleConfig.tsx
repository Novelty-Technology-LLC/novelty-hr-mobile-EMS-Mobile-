import {GoogleSignin} from '@react-native-google-signin/google-signin';

const GoogleConfig = () =>
  GoogleSignin.configure({
    webClientId:
      '1058123517066-dmp3h1jjvc40bdfkqi4n1isj8f9nmhjf.apps.googleusercontent.com',
    iosClientId:
      '1058123517066-9rohggcgu4imr4ni1ubt02csvbc2nen2.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

export {GoogleConfig};
