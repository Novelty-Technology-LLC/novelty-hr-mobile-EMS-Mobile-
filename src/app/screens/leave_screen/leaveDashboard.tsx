import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { header as Header } from "../../common/header";
import { DaysRemaining, MyRequests } from "../../components";
import { leaveDashboardStyle as style } from "../../../assets/styles";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors";
import OtherRequests from "../../components/leave_screen/otherRequests";

const LeaveDashboard = () => {
  const navigation = useNavigation();
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
      <View style={style.plus}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("requestLeave")}
        >
          <Icon name="plus" color={colors.white} size={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export { LeaveDashboard };
