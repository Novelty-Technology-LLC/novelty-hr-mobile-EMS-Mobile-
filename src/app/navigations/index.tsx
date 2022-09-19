import React, { useEffect } from "react";
import { Linking, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import VersionCheck from "react-native-version-check";
import { checkVersion } from "react-native-check-version";
import { AuthContext, useAuth } from "../reducer";
import { getUser, getToken } from "../utils";
import { Login, SplashScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import Invalid from "../screens/auth_screen/invalid";
import Loading from "../screens/auth_screen/loading";
import { navigationRef } from "../utils/navigation";
import { FullImageScreen } from "../screens/full_screen_image";

const Root = createStackNavigator();

const RootNavigation = () => {
  const { state, dispatch } = useAuth();

  const goToStore = async () => {
    const url = await VersionCheck.getStoreUrl();
    Linking.openURL(url);
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  const checkUpdate = async () => {
    try {
      const version = await checkVersion();
      if (version.needsUpdate) {
        Alert.alert(
          "New Update Available",
          "New version of app is available",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            { text: "UPDATE", onPress: () => goToStore() },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {}
  };
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await getToken();

        dispatch({ type: "RESTORE_TOKEN", token: userToken });
        const user = await getUser();

        dispatch({ type: "STORE_USER", user: JSON.parse(user) });
      } catch (e) {}
    };

    bootstrapAsync();
  }, []);

  const deepLinking = {
    prefixes: ["noveltyhrmobile://"],
    config: {
      screens: {
        BottomTabs: {
          path: "bottom_tabs",
          screens: {
            Activity: {
              path: "activity",
              exact: true,
            },
            Home: {
              path: "home",
              screens: {
                LeaveList: {
                  path: "leaveList",
                  exact: true,
                },
              },
            },
          },
        },
      },
    },
  };
  return (
    <NavigationContainer linking={deepLinking} ref={navigationRef}>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Root.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Root.Screen
            name="splash"
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Root.Screen name="login" component={Login} />
          <Root.Screen name="loading" component={Loading} />
          <Root.Screen name="invalid" component={Invalid} />
          <Root.Screen name="fullImageScreen" component={FullImageScreen} />
          <Root.Screen
            name="BottomTabs"
            component={TabNavigator}
            options={{ gestureEnabled: false }}
          />
        </Root.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default RootNavigation;
