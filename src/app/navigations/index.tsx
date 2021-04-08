import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, useAuth } from '../reducer';
import { getUser, getToken } from '../utils';
import { Login } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tabNavigator';
import Invalid from '../screens/auth_screen/invalid';
import Loading from '../screens/auth_screen/loading';
import { navigationRef } from '../utils/navigation';

const Root = createStackNavigator();

const RootNavigation = () => {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await getToken();

        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        const user = await getUser();
        dispatch({ type: 'STORE_USER', user: JSON.parse(user) });
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const deepLinking = {
    prefixes: ['noveltyhrmobile://'],
    config: {
      screens: {
        BottomTabs: {
          path: 'bottom_tabs',
          screens: {
            Activity: {
              path: 'activity',
              exact: true,
            },
            Home: {
              path: 'home',
              screens: {
                LeaveList: {
                  path: 'leaveList',
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
          <Root.Screen name="login" component={Login} />
          <Root.Screen name="loading" component={Loading} />
          <Root.Screen name="invalid" component={Invalid} />
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
