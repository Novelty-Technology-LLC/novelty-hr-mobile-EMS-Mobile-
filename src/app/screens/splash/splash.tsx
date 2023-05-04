import React, { useContext, useEffect, useState } from "react";
import {
  getInitialLogin,
  getToken,
  removeToken,
  removeUser,
} from "../../utils";
import { navigate } from "../../utils/navigation";
import { signOutGoogle } from "../../services";
import { AuthContext } from "../../reducer";
import UpdateModal from "../../common/updateModal";
import VersionCheck from "react-native-version-check";
import { AppState } from "react-native";

export const SplashScreen = () => {
  const { dispatch } = useContext<any>(AuthContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkUpdate();
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === "active") {
        checkUpdate();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

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

  const checkUpdate = async () => {
    try {
      const curretVersion = await VersionCheck.getCurrentVersion();
      const latestVersion = await VersionCheck.getLatestVersion();


      VersionCheck.needUpdate({
        currentVersion: curretVersion,
        latestVersion: latestVersion,
      }).then((res: any) => {
        if (res?.isNeeded) {
          setVisible(true);
        } else {
        }
      });
    } catch (e) {}
  };

  const closeModal = () => {
    setVisible(false);
  };

  return visible ? <UpdateModal closeModal={closeModal} /> : <></>;
};
