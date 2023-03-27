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
import UpdateModal from "../common/updateModal";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";

const Root = createStackNavigator();

const RootNavigation = () => {
  const { state, dispatch } = useAuth();
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();
  const { adminrequests, dispatchAdmin } = useAdmin();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
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
      {/* <ApplicationProvider
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
                        // backgroundColor: color.normal_text_color,
                      },

                      today: {
                        contentBorderRadius: 50,
                        contentBorderColor: "transparent",
                        // contentBackgroundColor: colors.light_grey,
                      },
                      range: {
                        borderRadius: 30,
                        paddingVertical: 10,
                        borderWidth: 15,
                        borderColor: "transparent",
                        // backgroundColor: color.background_color,
                      },
                    },
                  },
                },
              },
            },
          },
        }}
      > */}
      <AuthContext.Provider value={{ state, dispatch }}>
        <RequestWFHContext.Provider value={{ requestsWFH, dispatchWFHRequest }}>
          <AdminRequestContext.Provider
            value={{ adminrequests, dispatchAdmin }}
          >
            <UpdateModal />
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
          </AdminRequestContext.Provider>
        </RequestWFHContext.Provider>
      </AuthContext.Provider>
      {/* </ApplicationProvider> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
