import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TimeLog, LogTime, LogListings, FullScreenImage } from "../screens";
import {
  RequestContext,
  TimeLogContext,
  useRequest,
  useTimeLog,
} from "../reducer";
import { FullImageScreen } from "../screens/full_screen_image";
import {
  RequestWFHContext,
  useWFHRequest,
} from "../reducer/requestWorkFromReducer";

const LogStack = createStackNavigator();

const LogNav = () => {
  const { requestsWFH, dispatchWFHRequest } = useWFHRequest();

  const { timelogs, dispatchTimeLog } = useTimeLog();
  const { requests, dispatchRequest } = useRequest();
  return (
    <TimeLogContext.Provider value={{ timelogs, dispatchTimeLog }}>
      <RequestContext.Provider value={{ requests, dispatchRequest }}>
        <RequestWFHContext.Provider value={{ requestsWFH, dispatchWFHRequest }}>
          <LogStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <LogStack.Screen name="timelog" component={TimeLog} />
            <LogStack.Screen name="logtime" component={LogTime} />
            <LogStack.Screen name="loglistings" component={LogListings} />
          </LogStack.Navigator>
        </RequestWFHContext.Provider>
      </RequestContext.Provider>
    </TimeLogContext.Provider>
  );
};

export default LogNav;
