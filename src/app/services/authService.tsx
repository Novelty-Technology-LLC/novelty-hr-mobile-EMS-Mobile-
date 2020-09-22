import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import { storeToken } from '../utils';
import { snackErrorBottom } from '../common/error';

const signInGoogle = async (dispatch) => {
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
    snackErrorBottom(error);
  }
};

const signInApple = async (dispatch) => {
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
    snackErrorBottom(error);
  }
};

export { signInGoogle, signInApple };
