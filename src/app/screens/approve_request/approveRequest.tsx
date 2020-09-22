import React from "react";
import { Text, View } from "react-native";
import { approveRequest as style } from "../../../assets/styles";

const ApproveRequest = ({ route }) => {
  const { date, id, sender, state, type } = route.params;

  return (
    <View>
      <Text>Approve request</Text>
      <Text>{date}</Text>
      <Text>{sender}</Text>
      <Text>{state}</Text>
      <Text>{type}</Text>
    </View>
  );
};

export { ApproveRequest };
