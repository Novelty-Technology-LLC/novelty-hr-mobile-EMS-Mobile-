import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TimeLog, LogTime } from '../screens';
import { TimeLogContext, useTimeLog } from '../reducer';

const LogStack = createStackNavigator();

const LogNav = () => {
  const { timelogs, dispatchTimeLog } = useTimeLog();

  return (
    <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
      <LogStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <LogStack.Screen name="timelog" component={TimeLog} />
        <LogStack.Screen name="logtime" component={LogTime} />
      </LogStack.Navigator>
    </TimeLogContext.Provider>
  );
};

export default LogNav;
