import React from "react";
import { View, Text } from "react-native";

const RequestDetail = ({ route }) => {
  const { date, id, sender, state, type } = route.params;
  return (
    <View>
      <Text>requestDetail</Text>
      <Text>{date}</Text>
      <Text>{sender}</Text>
      <Text>{state}</Text>
      <Text>{type}</Text>
    </View>
  );
};

export { RequestDetail };
