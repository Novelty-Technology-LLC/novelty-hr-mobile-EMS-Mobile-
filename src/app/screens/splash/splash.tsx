import React, { useContext, useEffect } from "react";
import {
  getInitialLogin,
  getToken,
  removeToken,
  removeUser,
} from "../../utils";
import { navigate } from "../../utils/navigation";
import { signOutGoogle } from "../../services";
import { AuthContext } from "../../reducer";

export const SplashScreen = () => {
  const { dispatch } = useContext<any>(AuthContext);
  useEffect(() => {
    const tryLocalSignIn = async () => {
      try {
        const initial = await getInitialLogin();
        if (!initial) {
          await signOutGoogle();
          await removeUser();
          await removeToken();
          dispatch({ type: "SIGN_OUT" });
          navigate("login");
        } else {
          let userToken = await getToken();
          if (userToken) {
            navigate("BottomTabs");
          } else {
            navigate("login");
          }
        }
      } catch (e) {}
    };
    tryLocalSignIn();
  }, []);
  return <></>;
};
