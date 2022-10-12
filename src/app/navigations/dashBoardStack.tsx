import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashBoard, HolidayEventListing, LeaveListing } from "../screens";
import { TimeLogContext, useTimeLog } from "../reducer";
import { EmployeeListing } from "../screens/dashboard/employeeListing";
import { EmployeeDetail } from "../screens/dashboard/employeeDetail";
import { AnnouncementListing } from "../screens/dashboard/announcementsListing";
import { AnnouncementDetail } from "../screens/dashboard/announcementsDetail";
import { WorkFromHomeEmployeeListing } from "../screens/dashboard/workFromHomeEmployeeListing";
import { FullImageScreen } from "../screens/full_screen_image";
import AddAnnouncement from "../screens/dashboard/addAnnouncement";
const DashStack = createStackNavigator();

const DashNav = () => {
  const { timelogs, dispatchTimeLog } = useTimeLog();
  return (
    <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
      <DashStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <DashStack.Screen name="dashboard" component={DashBoard} />
        <DashStack.Screen name="leavelisting" component={LeaveListing} />
        <DashStack.Screen name="EmployeeListing" component={EmployeeListing} />
        <DashStack.Screen
          name="workFromHomeEmployeeListing"
          component={WorkFromHomeEmployeeListing}
        />
        <DashStack.Screen name="employeeDetail" component={EmployeeDetail} />
        <DashStack.Screen
          name="announcementsListing"
          component={AnnouncementListing}
        />
        <DashStack.Screen
          name="announcementsDetails"
          component={AnnouncementDetail}
        />
        <DashStack.Screen name="addAnnouncement" component={AddAnnouncement} />
        <DashStack.Screen
          name="holidayeventslisting"
          component={HolidayEventListing}
        />
      </DashStack.Navigator>
    </TimeLogContext.Provider>
  );
};

export default DashNav;
