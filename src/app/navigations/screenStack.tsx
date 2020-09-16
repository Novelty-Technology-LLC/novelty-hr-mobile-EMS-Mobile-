import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LeaveApproval, LeaveDashboard, Login, RequestLeave} from '../screens';

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  return (
    <>
      <ScreenStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ScreenStack.Screen name="login" component={Login} />
        <ScreenStack.Screen name="leaveApprove" component={LeaveApproval} />
        <ScreenStack.Screen name="leaveList" component={LeaveDashboard} />
        <ScreenStack.Screen name="requestLeave" component={RequestLeave} />
      </ScreenStack.Navigator>
    </>
  );
};

export default ScreenNav;
