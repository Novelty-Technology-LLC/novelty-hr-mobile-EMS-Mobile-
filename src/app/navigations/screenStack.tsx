import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApproveRequest,
  LeaveApproval,
  LeaveDashboard,
  RequestDetail,
  RequestLeave,
} from "../screens";

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  return (
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
  );
};

export default ScreenNav;
