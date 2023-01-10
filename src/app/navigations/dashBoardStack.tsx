import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApproveRequest,
  DashBoard,
  HolidayEventListing,
  LeaveListing,
} from "../screens";
import {
  AdminRequestContext,
  RequestContext,
  TimeLogContext,
  useAdmin,
  useRequest,
  useTimeLog,
} from "../reducer";
import { EmployeeListing } from "../screens/dashboard/employeeListing";
import { EmployeeDetail } from "../screens/dashboard/employeeDetail";
import { AnnouncementListing } from "../screens/dashboard/announcementsListing";
import { AnnouncementDetail } from "../screens/dashboard/announcementsDetail";
import { WorkFromHomeEmployeeListing } from "../screens/dashboard/workFromHomeEmployeeListing";
import { FullImageScreen } from "../screens/full_screen_image";
import AddAnnouncement from "../screens/dashboard/addAnnouncement";
import {
  AnnouncementContext,
  AnnouncementReducer,
} from "../reducer/announcementreducer";
import { useContext } from "react";
import { MenuListing } from "../screens/dashboard/menuListing";
import { EditMenu } from "../screens/dashboard/editMenu";
import { MenuContext, useMenu } from "../reducer/menuReducer";
import { ShoutoutDetails } from "../screens/dashboard/shoutoutDetail";
import { EditEmployeeDetail } from "../screens/dashboard/editEmployeeDetail";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";
import { MyWFHRequests } from "../components/wFHScreen/myWFHRequests";
import { RouteNames } from "../constant/route_names";
import { CreateShoutout } from "../screens/shoutout/createShoutout";
import { ShoutoutContext, useShoutout } from "../reducer/shoutoutReducer";
import { WFHDashboard } from "../screens/workFromHomeSreen/wFHDashboard";
import { RequestWFH } from "../screens/request_screen/requestWFH";
import { NAVIGATION_ROUTE } from "../constant/navigation.contant";
import { RequestWFHDetail } from "../screens/request_detail_screen/requestWFHDetail";
import { ApproveWFHRequest } from "../screens/approve_request/approveWfhRequest";

const DashStack = createStackNavigator();

const DashNav = () => {
  const { timelogs, dispatchTimeLog } = useTimeLog();
  const { state, dispatch } = AnnouncementReducer();
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();
  const { requests, dispatchRequest } = useRequest();
  const { adminrequests, dispatchAdmin } = useAdmin();

  return (
    <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
      <AnnouncementContext.Provider value={{ state, dispatch }}>
        <MenuContext.Provider value={useMenu()}>
          <ShoutoutContext.Provider value={useShoutout()}>
            <RequestWFHContext.Provider
              value={{ requestsWFH, dispatchWFHRequest }}
            >
              <AdminRequestContext.Provider
                value={{ adminrequests, dispatchAdmin }}
              >
                <RequestContext.Provider value={{ requests, dispatchRequest }}>
                  <DashStack.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <DashStack.Screen name='dashboard' component={DashBoard} />
                    <DashStack.Screen
                      name='WFH_DASHBOARD'
                      component={WFHDashboard}
                    />
                    <DashStack.Screen
                      name='Request_WFH'
                      component={RequestWFH}
                    />
                    <DashStack.Screen
                      name='leavelisting'
                      component={LeaveListing}
                    />
                    <DashStack.Screen
                      name='menuListing'
                      component={MenuListing}
                    />
                    <DashStack.Screen name='editMenu' component={EditMenu} />
                    <DashStack.Screen
                      name='EmployeeListing'
                      component={EmployeeListing}
                    />
                    <DashStack.Screen
                      name='workFromHomeEmployeeListing'
                      component={WorkFromHomeEmployeeListing}
                    />
                    <DashStack.Screen
                      name='employeeDetail'
                      component={EmployeeDetail}
                    />
                    <DashStack.Screen
                      name='editEmployeeDetail'
                      component={EditEmployeeDetail}
                    />
                    <DashStack.Screen
                      name='announcementsListing'
                      component={AnnouncementListing}
                    />
                    <DashStack.Screen
                      name='announcementsDetails'
                      component={AnnouncementDetail}
                    />
                    <DashStack.Screen
                      name='addAnnouncement'
                      component={AddAnnouncement}
                    />
                    <DashStack.Screen
                      name='holidayeventslisting'
                      component={HolidayEventListing}
                    />
                    <DashStack.Screen
                      name='shoutoutDetail'
                      component={ShoutoutDetails}
                    />
                    <DashStack.Screen
                      name={RouteNames.createShoutout}
                      component={CreateShoutout}
                    />
                    <DashStack.Screen
                      name='approveWfhLeave'
                      component={ApproveWFHRequest}
                    />
                    <DashStack.Screen
                      name={NAVIGATION_ROUTE.Request_WFH_DETAIL}
                      component={RequestWFHDetail}
                    />
                  </DashStack.Navigator>
                </RequestContext.Provider>
              </AdminRequestContext.Provider>
            </RequestWFHContext.Provider>
          </ShoutoutContext.Provider>
        </MenuContext.Provider>
      </AnnouncementContext.Provider>
    </TimeLogContext.Provider>
  );
};

export default DashNav;
