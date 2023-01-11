import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export const CustomText = ({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<TextStyle>;
}) => {
  return <Text style={[style]}>{text}</Text>;
};
