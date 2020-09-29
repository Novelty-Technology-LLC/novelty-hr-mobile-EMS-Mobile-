import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ApproveRequest,
  LeaveApproval,
  LeaveDashboard,
  RequestDetail,
  RequestLeave,
} from '../screens';
import { RequestContext, useRequest } from '../reducer';

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  const { requests, dispatchRequest } = useRequest();
  return (
    <RequestContext.Provider value={{ requests, dispatchRequest }}>
      <ScreenStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ScreenStack.Screen name="leaveList" component={LeaveDashboard} />
        <ScreenStack.Screen name="leaveApprove" component={LeaveApproval} />
        <ScreenStack.Screen name="requestLeave" component={RequestLeave} />
        <ScreenStack.Screen name="approveLeave" component={ApproveRequest} />
        <ScreenStack.Screen name="requestDetail" component={RequestDetail} />
      </ScreenStack.Navigator>
    </RequestContext.Provider>
  );
};

export default ScreenNav;
