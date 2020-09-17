import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { header as Header } from "../../common/header";
import { DaysRemaining, MyRequests } from "../../components";
import { leaveDashboardStyle as style } from "../../../assets/styles";

const LeaveDashboard = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header>Leave Application</Header>
      <View style={style.container}>
        <DaysRemaining total={5} remaining={4} title="Paid Time Offs" />
        <DaysRemaining total={5} remaining={3} title="Floating Days" />
      </View>
      <MyRequests />

      <Button
        title="Approve"
        onPress={() => navigation.navigate("leaveApprove")}
      />
      <Button
        title="Request"
        onPress={() => navigation.navigate("requestLeave")}
      />
    </View>
  );
};

export { LeaveDashboard };
