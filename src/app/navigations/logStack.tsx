import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TimeLog, LogTime, LogListings, FullScreenImage } from "../screens";
import {
  RequestContext,
  TimeLogContext,
  useRequest,
  useTimeLog,
} from "../reducer";

const LogStack = createStackNavigator();

const LogNav = () => {
  const { timelogs, dispatchTimeLog } = useTimeLog();
  const { requests, dispatchRequest } = useRequest();
  return (
    <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
      <RequestContext.Provider value={{ requests, dispatchRequest }}>
        <LogStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <LogStack.Screen name="timelog" component={TimeLog} />
          <LogStack.Screen name="logtime" component={LogTime} />
          <LogStack.Screen name="loglistings" component={LogListings} />
        </LogStack.Navigator>
      </RequestContext.Provider>
    </TimeLogContext.Provider>
  );
};

export default LogNav;
