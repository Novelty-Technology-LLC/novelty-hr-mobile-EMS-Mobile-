import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { leaveDashboardStyle as style } from "../../assets/styles";

const RequestButton = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={style.plus}
        onPress={() => navigation.navigate("requestLeave")}
      >
        <Icon name="plus" color={colors.white} size={20} />
      </TouchableOpacity>
    </>
  );
};

export { RequestButton };
