import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const button = ({ style, title, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {title && <Text style={style}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default button;
