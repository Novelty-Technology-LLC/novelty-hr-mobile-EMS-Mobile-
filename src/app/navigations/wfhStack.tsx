import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AdminRequestContext,
  RequestContext,
  useAdmin,
  useRequest,
} from "../reducer";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";
import { RequestWFH } from "../screens/request_screen/requestWFH";
import { RequestWFHDetail } from "../screens/request_detail_screen/requestWFHDetail";
import { WFHDashboard } from "../screens/workFromHomeSreen/wFHDashboard";
import { ApproveWFHRequest } from "../screens/approve_request/approveWfhRequest";

const WFHStack = createStackNavigator();

export const WfhNav = () => {
  const { adminrequests, dispatchAdmin } = useAdmin();
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();
  const { requests, dispatchRequest } = useRequest();

  return (
    <AdminRequestContext.Provider value={{ adminrequests, dispatchAdmin }}>
      <RequestContext.Provider value={{ requests, dispatchRequest }}>
        <RequestWFHContext.Provider value={{ requestsWFH, dispatchWFHRequest }}>
          <WFHStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <WFHStack.Screen name="WFH_DASHBOARD" component={WFHDashboard} />
            <WFHStack.Screen name="Request_WFH" component={RequestWFH} />
            <WFHStack.Screen
              name="approveWfhLeave"
              component={ApproveWFHRequest}
            />

            <WFHStack.Screen
              name={"Request_WFH_DETAIL"}
              component={RequestWFHDetail}
            />
          </WFHStack.Navigator>
        </RequestWFHContext.Provider>
      </RequestContext.Provider>
    </AdminRequestContext.Provider>
  );
};
