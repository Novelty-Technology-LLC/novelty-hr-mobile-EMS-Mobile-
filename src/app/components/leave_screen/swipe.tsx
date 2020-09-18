import React from "react";
import { View } from "react-native";
import { swipeStyle as style } from "../../../assets/styles";
import { DeleteAlert } from "./deleteAlert";
import EditAlert from "./editAlert";

const Swipe = ({ item }: any) => {
  return (
    <View style={style.container}>
      <EditAlert item={item} />
      <DeleteAlert />
    </View>
  );
};

export default Swipe;
