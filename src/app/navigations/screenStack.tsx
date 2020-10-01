import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ApproveRequest,
  LeaveApproval,
  LeaveDashboard,
  RequestDetail,
  RequestLeave,
} from '../screens';
import {
  AdminRequestContext,
  RequestContext,
  useAdmin,
  useRequest,
} from '../reducer';

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  const { requests, dispatchRequest } = useRequest();
  const { adminrequests, dispatchAdmin } = useAdmin();
  return (
    <RequestContext.Provider value={{ requests, dispatchRequest }}>
      <AdminRequestContext.Provider value={{ adminrequests, dispatchAdmin }}>
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
      </AdminRequestContext.Provider>
    </RequestContext.Provider>
  );
};

export default ScreenNav;
