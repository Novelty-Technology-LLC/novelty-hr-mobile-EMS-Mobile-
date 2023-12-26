import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  AdminRequestContext,
  AuthContext,
  useAdmin,
  useAuth,
} from "../reducer";
import { getUser, getToken } from "../utils";
import { Login, SplashScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import Invalid from "../screens/auth_screen/invalid";
import Loading from "../screens/auth_screen/loading";
import { navigationRef } from "../utils/navigation";
import { FullImageScreen } from "../screens/full_screen_image";
import SplashScreens from "react-native-splash-screen";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";
import {
  PendingRequestContext,
  useRequest,
} from "../reducer/pendingRequestReducer";
import messaging from "@react-native-firebase/messaging";

const Root = createStackNavigator();

const RootNavigation = () => {
  const { state, dispatch } = useAuth();
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();
  const { adminrequests, dispatchAdmin } = useAdmin();
  const { pendingRequests, dispatchPendingRequest } = useRequest();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await messaging().getToken();
        console.log(" token", token);
        let userToken = await getToken();

        dispatch({ type: "RESTORE_TOKEN", token: userToken });
        const user: any = await getUser();

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
              screens: {
                WFH_DASHBOARD: {
                  path: "homeList",
                  exact: true,
                },
              },
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
    <NavigationContainer
      linking={deepLinking}
      ref={navigationRef}
      onReady={() => SplashScreens.hide()}
    >
      <AuthContext.Provider value={{ state, dispatch }}>
        <RequestWFHContext.Provider value={{ requestsWFH, dispatchWFHRequest }}>
          <AdminRequestContext.Provider
            value={{ adminrequests, dispatchAdmin }}
          >
            <PendingRequestContext.Provider
              value={{ pendingRequests, dispatchPendingRequest }}
            >
              <Root.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Root.Screen name="splash" component={SplashScreen} />
                <Root.Screen name="login" component={Login} />
                <Root.Screen name="loading" component={Loading} />
                <Root.Screen name="invalid" component={Invalid} />
                <Root.Screen
                  name="fullImageScreen"
                  component={FullImageScreen}
                />
                <Root.Screen
                  name="BottomTabs"
                  component={TabNavigator}
                  options={{ gestureEnabled: false }}
                />
              </Root.Navigator>
            </PendingRequestContext.Provider>
          </AdminRequestContext.Provider>
        </RequestWFHContext.Provider>
      </AuthContext.Provider>
      {/* </ApplicationProvider> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
