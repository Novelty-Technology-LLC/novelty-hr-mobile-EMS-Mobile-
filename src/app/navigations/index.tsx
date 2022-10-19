import React, { useEffect } from "react";
import { Linking, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import VersionCheck from "react-native-version-check";
import { checkVersion } from "react-native-check-version";
import * as eva from "@eva-design/eva";
import { AuthContext, useAuth } from "../reducer";
import { getUser, getToken } from "../utils";
import { Login, SplashScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import Invalid from "../screens/auth_screen/invalid";
import Loading from "../screens/auth_screen/loading";
import { navigationRef } from "../utils/navigation";
import { FullImageScreen } from "../screens/full_screen_image";
import SplashScreens from "react-native-splash-screen";
import { ApplicationProvider } from "@ui-kitten/components";
import { theme } from "../../assets/styles";

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

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await getToken();

        dispatch({ type: "RESTORE_TOKEN", token: userToken });
        const user: any = await getUser();

        dispatch({ type: "STORE_USER", user: JSON.parse(user) });
      } catch (e) { }
    };

    bootstrapAsync();
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
          Alert.alert(
            "New Update Available",
            "New version of EMS is available",
            [
              {
                text: "Cancel",
                onPress: () => { },
                style: "cancel",
              },
              { text: "UPDATE", onPress: () => goToStore() },
            ],
            { cancelable: false }
          );
        } else {
        }
      });
    } catch (e) { }
  };

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
    <NavigationContainer
      linking={deepLinking}
      ref={navigationRef}
      onReady={() => SplashScreens.hide()}
    >
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        customMapping={{
          components: {
            CalendarCell: {
              meta: {
                scope: "all",
                parameters: {
                  paddingHorizontal: {
                    type: "number",
                  },
                  paddingVertical: {
                    type: "number",
                  },
                  backgroundColor: {
                    type: "string",
                  },
                  borderRadius: {
                    type: "string",
                  },
                  contentBorderWidth: {
                    type: "number",
                  },
                  contentBorderRadius: {
                    type: "string",
                  },
                  contentBorderColor: {
                    type: "string",
                  },
                  contentBackgroundColor: {
                    type: "string",
                  },
                  contentTextColor: {
                    type: "string",
                  },
                  contentTextFontSize: {
                    type: "number",
                  },
                  contentTextFontWeight: {
                    type: "number",
                  },
                  contentTextFontFamily: {
                    type: "string",
                  },
                },
                appearances: {
                  default: {
                    default: true,
                  },
                },
                variantGroups: {},
                states: {
                  bounding: {
                    scope: "all",
                    priority: 0,
                    default: false,
                  },
                  today: {
                    scope: "all",
                    priority: 1,
                    default: false,
                  },
                  disabled: {
                    scope: "all",
                    priority: 2,
                    default: false,
                  },
                  selected: {
                    scope: "all",
                    priority: 3,
                    default: false,
                  },
                  range: {
                    scope: "all",
                    priority: 5,
                    default: false,
                  },
                },
              },
              appearances: {
                default: {
                  mapping: {
                    paddingHorizontal: 0,
                    state: {
                      bounding: {},
                      selected: {
                        contentBorderRadius: 0,
                        paddingVertical: 0,
                        contentBorderWidth: 0,
                        contentBorderColor: "transparent",
                        backgroundColor: theme.color.normal_text_color,
                      },

                      today: {
                        contentBorderRadius: 50,
                        contentBorderColor: "transparent",
                        contentBackgroundColor: theme.color.light_grey,
                      },
                      range: {
                        borderRadius: 30,
                        paddingVertical: 10,
                        borderWidth: 15,
                        borderColor: "transparent",
                        backgroundColor: theme.color.background_color,
                      },
                    },
                  },
                },
              },
            },
          },
        }}
      >
        <AuthContext.Provider value={{ state, dispatch }}>
          <Root.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Root.Screen name="splash" component={SplashScreen} />
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
      </ApplicationProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
