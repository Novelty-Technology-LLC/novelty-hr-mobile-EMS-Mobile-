import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { initialLogin, setUser, storeToken } from "../utils";
import { login } from "./userService";
import { showToast } from "../common";
import { TokenTypes } from "../enums";

const signInGoogle = async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo: any = await GoogleSignin.signIn();
    if (!userInfo.idToken) throw new Error("Error while sign in");
    dispatch({ type: "RESET" });

    const signInData = {
      auth_token: userInfo.idToken,
      token_type: TokenTypes.GOOGLE,
    };
    appLogin(dispatch, signInData);
  } catch (error: any) {
    console.log("errr ", error);
    
    if (error.message === "NETWORK_ERROR") {
      error.message = "Please connect to a network.";
    } else {
      error.message = "Sign in error";
    }
    showToast(`${error?.message} `, false);
  }
};

const appLogin = (dispatch: any, data: any, loadFalse = () => {}) => {
  // const objuser = {
  //   email: 'pradip@noveltytechnology.com',
  //   image_url:
  //     'https://lh3.googleusercontent.com/a-/AOh14Ggsxb3NpBErPwptsikzXju0pFAW71vphZXwQOkL=s120',
  //   uuid: '103684157629101882595',
  // };

  login(data)
    .then(async ({ data }: any) => {
      await setUser(data.data);
      dispatch({ type: "STORE_USER", user: data.data });
      const token = data.data.access_token;

      await storeToken(token);
      await initialLogin("isLoggedIn");
      dispatch({ type: "SIGN_IN", token });
      loadFalse();
    })
    .catch((err: any) => {
      loadFalse();
      if (err?.message === "Request failed with status code 404") {
        dispatch({ type: "INVALID" });
      } else {
        dispatch({ type: "ERROR" });
      }
    });
};

const signInApple = async (dispatch: any) => {
  try {
    if (!appleAuth.isSupported) throw new Error("Apple signin not supported");
    const data: any = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!data.identityToken || !data.email)
      throw new Error("Please provide your email.");

    const signInData = {
      auth_token: data.identityToken,
      token_type: TokenTypes.APPLE,
    };

    if (/@noveltytechnology.com\s*$/.test(data.email)) {
      appLogin(dispatch, signInData);
    } else {
      dispatch({ type: "INVALID" });
    }
  } catch (error: any) {
    if (error.message === "NETWORK_ERROR") {
      error.message = "Please connect to a network.";
    } else {
      error.message = "Unknown error occured";
    }
    showToast(`${error?.message} `, false);
  }
};

const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {}
};

export { signInGoogle, signInApple, signOutGoogle, appLogin };
