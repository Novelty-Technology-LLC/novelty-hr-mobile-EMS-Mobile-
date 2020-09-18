import React, { useContext, useEffect, useReducer } from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loginStyle as style } from '../../../assets/styles';
import { WSnackBar } from 'react-native-smart-tip';
import { AuthContext } from '../../reducer';
import { storeToken } from '../../utils';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '742877336730-9lt7k06p7eihbb6rar2esdeal9recl2l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      iosClientId:
        '742877336730-8mscg3mk8ccel2u3gkr7njhq3g9jod86.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.idToken) throw new Error('Error while sign in');

      userInfo.user['token'] = userInfo.idToken;
      delete userInfo.idToken;

      storeToken(userInfo.user);
      dispatch({ type: 'SIGN_IN', token: userInfo.user });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED)
        error.message = 'Sign in cancled.';
      const snackBarOpts = {
        data: error.message.slice(0, 35),
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.LONG,
        textColor: '#ff490b',
        backgroundColor: '#050405',
        actionTextColor: '#ff490b',
      };
      WSnackBar.show(snackBarOpts);
    }
  };

  const signInApple = async () => {
    try {
      if (!appleAuth.isSupported) throw new Error('Apple signin not supported');

      const data = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      if (!data.identityToken || !data.email)
        throw new Error('Please provide email');

      data.fullName['email'] = data.email;
      data.fullName['token'] = data.identityToken;
      delete data.identityToken;

      storeToken(data.fullName);
      dispatch({ type: 'SIGN_IN', token: data.fullName });
    } catch (error) {
      const snackBarOpts = {
        data: error.message.slice(0, 35),
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.LONG,
        textColor: '#ff490b',
        backgroundColor: '#050405',
        actionTextColor: '#ff490b',
      };
      WSnackBar.show(snackBarOpts);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.imageView}>
        <Image
          style={style.image}
          source={require('../../../assets/images/noveltylogo.png')}
        />
        <Text style={style.imageText}>Novelty EMS</Text>
      </View>
      <View style={style.buttonView}>
        <Text style={style.buttonText}>Continue with</Text>
        <View style={style.loginView}>
          <TouchableOpacity
            style={style.iconView}
            onPress={() => signInGoogle()}
          >
            <Image
              style={style.icon}
              source={require('../../../assets/images/icons8-google-96.png')}
            />
          </TouchableOpacity>

          <View style={style.iconView}>
            <TouchableOpacity onPress={() => signInApple()}>
              <Image
                style={style.icon}
                source={require('../../../assets/images/icons8-apple-logo-100.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.footerView}>
        <Text>Copyright 2020. Powered by Novelty Technology.</Text>
      </View>
    </View>
  );
};

export { Login };
