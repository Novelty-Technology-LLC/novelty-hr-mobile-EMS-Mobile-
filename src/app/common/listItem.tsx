import React from "react";
import { View } from "react-native";
import { Text } from "react-native-svg";

const ListItem = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    // <View style={{ width: "100%" }}>
    // <Text>{title}</Text>
    <Text>{subTitle}</Text>
    // </View>
  );
};

export { ListItem };
