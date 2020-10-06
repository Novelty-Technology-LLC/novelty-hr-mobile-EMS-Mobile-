import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { setUser, setIsApprover, storeToken } from '../utils';
import { create } from './userService';
import { mapDataToObject } from '../utils';
import { snackErrorBottom } from '../common';

const signInGoogle = async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo: any = await GoogleSignin.signIn();

    if (!userInfo.idToken) throw new Error('Error while sign in');
    delete userInfo.user.name;

    const userData = mapDataToObject(userInfo.user);
    create(userData)
      .then(async ({ data }: any) => {
        console.log(data.data);
        await setUser(data.data);
        dispatch({ type: 'STORE_USER', user: data.data });
        await storeToken(userInfo.idToken);
        dispatch({ type: 'SIGN_IN', token: userInfo.idToken });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED)
      error.message = 'Sign in cancled.';
    snackErrorBottom(error);
  }
};

const signInApple = async (dispatch: any) => {
  try {
    if (!appleAuth.isSupported) throw new Error('Apple signin not supported');

    const data: any = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    if (!data.identityToken || !data.email)
      throw new Error('Please provide your email.');

    data.fullName['email'] = data.email;
    data.fullName['token'] = data.identityToken;
    data.fullName['id'] = data.user;

    const userData = mapDataToObject(data.fullName);
    create(userData)
      .then(async (res: any) => {
        dispatch({ type: 'STORE_USER', user: res.data.data });
        storeToken(data.identityToken);
        dispatch({ type: 'SIGN_IN', token: data.identityToken });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    snackErrorBottom(error);
  }
};

export { signInGoogle, signInApple };
