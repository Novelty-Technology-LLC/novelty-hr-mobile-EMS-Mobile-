import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApproveRequest,
  LeaveApproval,
  LeaveDashboard,
  Login,
  RequestDetail,
  RequestLeave,
} from "../screens";
import { useAuth, AuthContext } from "../reducer";
import { Text } from "react-native";
import { getToken } from "../utils";

const ScreenStack = createStackNavigator();

const ScreenNav = () => {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await getToken();
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {}
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return <Text>Hello</Text>;
  } else {
    return (
      <>
        <AuthContext.Provider value={{ state, dispatch }}>
          <ScreenStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {state.userToken === null ? (
              <ScreenStack.Screen name="login" component={Login} />
            ) : (
              <>
                <ScreenStack.Screen
                  name="leaveList"
                  component={LeaveDashboard}
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
              </>
            )}
          </ScreenStack.Navigator>
        </AuthContext.Provider>
      </>
    );
  }
};

export default ScreenNav;
