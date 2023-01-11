import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GoogleConfig = () =>
  GoogleSignin.configure({
    webClientId:
      '999740786889-dd4e9nd4ifq1md20n32lum3ajago6ckd.apps.googleusercontent.com',
    iosClientId:
      '999740786889-leks6sl2o6nkguudgndbs0hsfrcrmsmg.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

export { GoogleConfig };
