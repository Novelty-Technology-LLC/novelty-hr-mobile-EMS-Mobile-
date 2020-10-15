import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenStack from './screenStack';
import colors from '../../assets/colors';
import { ComingSoon, Activity, Profile } from '../screens';
import { AppIcon } from '../common';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
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
          component={Activity}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="timer" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={ComingSoon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
