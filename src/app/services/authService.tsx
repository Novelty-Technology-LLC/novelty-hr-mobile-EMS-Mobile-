import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from "@invertase/react-native-apple-authentication";

import { setUser, storeToken } from "../utils";
import { create } from "./userService";
import { mapDataToObject } from "../utils/transformer";
import { snackErrorBottom } from "../common/error";
import { showToast } from "../common";

const signInGoogle = async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo: any = await GoogleSignin.signIn();

    if (!userInfo.idToken) throw new Error("Error while sign in");
    dispatch({ type: "RESET" });
    delete userInfo.user.name;
    const userData = mapDataToObject(userInfo.user);
    createUser(dispatch, userData, userInfo.idToken);
  } catch (error: any) {
    if (error.message === "NETWORK_ERROR") {
      error.message = "Please connect to a network.";
    } else {
      error.message = "Sign in error";
    }
    showToast(error?.message, false);
  }
};

const createUser = (dispatch: any, user: any, token: any) => {
  // const objuser = {
  //   email: 'pradip@noveltytechnology.com',
  //   image_url:
  //     'https://lh3.googleusercontent.com/a-/AOh14Ggsxb3NpBErPwptsikzXju0pFAW71vphZXwQOkL=s120',
  //   uuid: '103684157629101882595',
  // };
  // console.log('user', objuser);
  create(user)
    .then(async ({ data }: any) => {
      await setUser(data.data);
      dispatch({ type: "STORE_USER", user: data.data });
      await storeToken(token);
      dispatch({ type: "SIGN_IN", token });
    })
    .catch((err) => {
      if (err?.response?.status === 404) {
        dispatch({ type: "INVALID" });
      }
    });
};

const signInApple = async (dispatch: any) => {
  try {
    if (!appleAuth.isSupported) throw new Error("Apple signin not supported");
    const data: any = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    if (!data.identityToken || !data.email)
      throw new Error("Please provide your email.");

    data.fullName["email"] = data.email;
    data.fullName["token"] = data.identityToken;
    data.fullName["id"] = data.user;

    const userData = mapDataToObject(data.fullName);
    if (/@noveltytechnology.com\s*$/.test(userData.email)) {
      create(userData)
        .then(async (res: any) => {
          await setUser(res.data.data);
          dispatch({ type: "STORE_USER", user: res.data.data });
          storeToken(data.identityToken);
          dispatch({ type: "SIGN_IN", token: data.identityToken });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({ type: "INVALID" });
    }
  } catch (error: any) {
    if (error.message === "NETWORK_ERROR") {
      error.message = "Please connect to a network.";
    } else {
      error.message = "Unknown error occured";
    }
    showToast(error?.message, false);
  }
};

const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }
};

export { signInGoogle, signInApple, signOutGoogle, createUser };
