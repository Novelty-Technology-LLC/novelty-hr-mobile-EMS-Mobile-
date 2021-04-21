import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashBoard, HolidayEventListing, LeaveListing } from '../screens';

const DashStack = createStackNavigator();

const DashNav = () => {
  return (
    <DashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DashStack.Screen name="dashboard" component={DashBoard} />
      <DashStack.Screen name="leavelisting" component={LeaveListing} />
      <DashStack.Screen
        name="holidayeventslisting"
        component={HolidayEventListing}
      />
    </DashStack.Navigator>
  );
};

export default DashNav;
