import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashBoard, Detail } from '../screens';

const DashStack = createStackNavigator();

const DashNav = () => {
  return (
    <DashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DashStack.Screen name="dashboard" component={DashBoard} />
      <DashStack.Screen name="detail" component={Detail} />
    </DashStack.Navigator>
  );
};

export default DashNav;
