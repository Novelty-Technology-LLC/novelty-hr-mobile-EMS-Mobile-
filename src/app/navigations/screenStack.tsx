import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApproveRequest,
  FullScreenImage,
  LeaveApproval,
  LeaveDashboard,
  RequestDetail,
  RequestLeave,
} from "../screens";
import {
  AdminRequestContext,
  RequestContext,
  TimeLogContext,
  useAdmin,
  useRequest,
  useTimeLog,
} from "../reducer";
import { FullImageScreen } from "../screens/full_screen_image";
import AddAnnouncement from "../screens/dashboard/addAnnouncement";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  const { requests, dispatchRequest } = useRequest();
  const { adminrequests, dispatchAdmin } = useAdmin();
  const { timelogs, dispatchTimeLog } = useTimeLog();
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();

  return (
    <RequestContext.Provider value={{ requests, dispatchRequest }}>
      <AdminRequestContext.Provider value={{ adminrequests, dispatchAdmin }}>
        <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
          <RequestWFHContext.Provider
            value={{ requestsWFH, dispatchWFHRequest }}
          >
            <ScreenStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <ScreenStack.Screen name="leaveList" component={LeaveDashboard} />
              <ScreenStack.Screen
                name="addAnnouncement"
                component={AddAnnouncement}
              />
              <ScreenStack.Screen
                name="leaveApprove"
                component={LeaveApproval}
              />
              <ScreenStack.Screen
                name="requestLeave"
                component={RequestLeave}
              />

              <ScreenStack.Screen
                name="approveLeave"
                component={ApproveRequest}
              />
              <ScreenStack.Screen
                name="requestDetail"
                component={RequestDetail}
              />
            </ScreenStack.Navigator>
          </RequestWFHContext.Provider>
        </TimeLogContext.Provider>
      </AdminRequestContext.Provider>
    </RequestContext.Provider>
  );
};

export default ScreenNav;
