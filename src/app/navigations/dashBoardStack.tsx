import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashBoard, HolidayEventListing, LeaveListing } from "../screens";
import { TimeLogContext, useTimeLog } from "../reducer";
import { EmployeeListing } from "../screens/dashboard/employeeListing";
import { EmployeeDetail } from "../screens/dashboard/employeeDetail";
import { AnnouncementListing } from "../screens/dashboard/announcementsListing";
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
        <DashStack.Screen name="employeeListing" component={EmployeeListing} />
        <DashStack.Screen name="employeeDetail" component={EmployeeDetail} />
        <DashStack.Screen
          name="announcementsListing"
          component={AnnouncementListing}
        />
        <DashStack.Screen
          name="holidayeventslisting"
          component={HolidayEventListing}
        />
      </DashStack.Navigator>
    </TimeLogContext.Provider>
  );
};

export default DashNav;
