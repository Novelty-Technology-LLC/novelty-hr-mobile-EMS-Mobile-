import {GoogleSignin} from '@react-native-google-signin/google-signin';

const GoogleConfig = () =>
  GoogleSignin.configure({
    webClientId:
      '1058123517066-ncsq4l5rj44mro0g81cqid6uuv3jvpvt.apps.googleusercontent.com',
    iosClientId:
      '1058123517066-9rohggcgu4imr4ni1ubt02csvbc2nen2.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

export {GoogleConfig};
