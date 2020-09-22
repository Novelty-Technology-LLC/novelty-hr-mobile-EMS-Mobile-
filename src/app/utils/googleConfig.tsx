import { GoogleSignin } from '@react-native-community/google-signin';

const GoogleConfig = () =>
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '742877336730-9lt7k06p7eihbb6rar2esdeal9recl2l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    iosClientId:
      '742877336730-8mscg3mk8ccel2u3gkr7njhq3g9jod86.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  });

export { GoogleConfig };
