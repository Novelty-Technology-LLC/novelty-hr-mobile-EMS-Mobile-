import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TimeLog, LogTime } from '../screens';

const LogStack = createStackNavigator();

const LogNav = () => {
  return (
    <LogStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LogStack.Screen name="timelog" component={TimeLog} />
      <LogStack.Screen name="logtime" component={LogTime} />
    </LogStack.Navigator>
  );
};

export default LogNav;
