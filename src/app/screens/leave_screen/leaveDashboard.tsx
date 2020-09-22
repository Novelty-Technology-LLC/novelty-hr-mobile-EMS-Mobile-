import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { header as Header } from "../../common/header";
import { DaysRemaining, MyRequests } from "../../components";
import { leaveDashboardStyle as style } from "../../../assets/styles";

import OtherRequests from "../../components/leave_screen/otherRequests";
import { RequestButton } from "../../components/requestButton";
import colors from "../../../assets/colors";

const LeaveDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <View style={style.mainContainer}>
      <Header>Leave Application</Header>
      <ScrollView>
        <View style={style.container}>
          <DaysRemaining total={5} remaining={4} title="Paid Time Offs" />
          <DaysRemaining total={5} remaining={3} title="Floating Days" />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.white,
          }}
        >
          <Text
            style={{
              color: isAdmin ? colors.primary : colors.secondary,
            }}
            onPress={() => setIsAdmin(!isAdmin)}
          >
            ADMIN
          </Text>
        </View>
        {isAdmin ? <OtherRequests /> : <MyRequests />}
      </ScrollView>
      <RequestButton />
    </View>
  );
};

export { LeaveDashboard };
