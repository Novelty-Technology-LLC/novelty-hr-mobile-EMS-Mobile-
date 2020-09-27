import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenStack from './screenStack';
import colors from '../../assets/colors';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={ScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="timer" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={ScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator> */}
      <ScreenStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
