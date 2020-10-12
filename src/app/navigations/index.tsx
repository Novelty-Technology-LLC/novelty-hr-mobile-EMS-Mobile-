import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, useAuth } from '../reducer';
import { getUser, getToken } from '../utils';
import { Text } from 'react-native-svg';
import { Login } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tabNavigator';
import Invalid from '../screens/auth_screen/invalid';

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

  if (state.isLoading) {
    return <Text>Hello</Text>;
  } else {
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{ state, dispatch }}>
          <Root.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {state.userToken === null ? (
              !state.isInvalid ? (
                <Root.Screen name="login" component={Login} />
              ) : (
                <Root.Screen name="invalid" component={Invalid} />
              )
            ) : (
              <Root.Screen name="tab" component={TabNavigator} />
            )}
          </Root.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
