import React from "react";
import { View, Text } from "react-native";
import { headerTxtStyle, leaveDashboardStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { TimeLogs } from "../../components/time_log";

const TimeLog = (props: any) => {
  return (
    <View style={leaveDashboardStyle.mainContainer}>
      <Header>
        <Text style={headerTxtStyle.headerText}>Time Log</Text>
      </Header>
      <TimeLogs reload={props.route.params?.reload} />
    </View>
  );
};

export { TimeLog };
