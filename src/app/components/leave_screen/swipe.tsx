import React from "react";
import { View } from "react-native";
import { swipeStyle as style } from "../../../assets/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../assets/colors";
import { DeleteAlert } from "./deleteAlert";

const Swipe = () => {
  return (
    <View style={style.container}>
      <Icon name="edit" color={colors.yellow} size={15} />
      <DeleteAlert />
    </View>
  );
};

export default Swipe;
