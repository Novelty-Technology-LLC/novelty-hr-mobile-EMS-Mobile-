import React, { useEffect } from "react";
import { getToken } from "../../utils";
import { navigate } from "../../utils/navigation";

export const SplashScreen = () => {
  useEffect(() => {
    const tryLocalSignIn = async () => {
      try {
        let userToken = await getToken();
        if (userToken) {
          navigate("BottomTabs");
        } else {
          navigate("login");
        }
      } catch (e) {}
    };
    tryLocalSignIn();
  }, []);
  return <></>;
};
