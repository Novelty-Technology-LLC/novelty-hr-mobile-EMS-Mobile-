import { GoogleSignin } from '@react-native-community/google-signin';

const GoogleConfig = () =>
  GoogleSignin.configure({
    webClientId:
      '999740786889-dd4e9nd4ifq1md20n32lum3ajago6ckd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId:
      '999740786889-leks6sl2o6nkguudgndbs0hsfrcrmsmg.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  });

export { GoogleConfig };
