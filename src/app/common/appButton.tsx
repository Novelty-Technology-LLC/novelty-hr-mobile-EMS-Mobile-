import React from "react";
import { View, Text } from "react-native";
import { appButtonStyle as style } from "../../assets/styles";

const AppButton = ({ approve, title, buttonStyle }: any) => {
  return (
    <View style={[buttonStyle, approve ? style.approve : style.deny]}>
      <Text style={approve ? style.approveText : style.denyText}>{title}</Text>
    </View>
  );
};

export default AppButton;
