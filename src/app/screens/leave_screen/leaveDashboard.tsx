import React from "react";
import { View, ScrollView } from "react-native";
import { header as Header } from "../../common/header";
import { DaysRemaining, MyRequests } from "../../components";
import { leaveDashboardStyle as style } from "../../../assets/styles";

import OtherRequests from "../../components/leave_screen/otherRequests";
import { RequestButton } from "../../components/requestButton";

const LeaveDashboard = () => {
  return (
    <View style={style.mainContainer}>
      <Header>Leave Application</Header>
      <ScrollView>
        <View style={style.container}>
          <DaysRemaining total={5} remaining={4} title="Paid Time Offs" />
          <DaysRemaining total={5} remaining={3} title="Floating Days" />
        </View>
        <MyRequests />
        {/* <OtherRequests /> */}
      </ScrollView>
      <RequestButton />
    </View>
  );
};

export { LeaveDashboard };
