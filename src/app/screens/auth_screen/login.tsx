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
        '245208989401-6ucq6geuudf78d439m14hun8ohicmof3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('info', userInfo);
      navigation.navigate('leaveList');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error occured SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error occured IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error occured PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log(error);
        console.log('error occured unknow error');
      }
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

      if (!data.identityToken) throw new Error('Error while signin');

      const jsonValue = JSON.stringify(data);
      storeToken(jsonValue);
      dispatch({ type: 'SIGN_IN', token: jsonValue });
    } catch (error) {
      const snackBarOpts = {
        data: error.message,
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
          <TouchableOpacity style={style.iconView} onPress={() => signIn()}>
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
