import React from "react";
import { View, Text, Alert, Button, ActivityIndicator } from "react-native";
import { swipeStyle as style } from "../../../assets/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../assets/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { DeleteAlert } from "./deleteAlert";

const deleteAlert = () => {
  Alert.alert("Delete the Request?", "", [
    {
      text: "CANCEL",
      style: "cancel",
    },
    { text: "DELETE", onPress: () => console.log("OK Pressed") },
  ]);
};

const Swipe = () => {
  return (
    <View style={style.container}>
      <Icon name="edit" color={colors.yellow} size={15} />
      <DeleteAlert />
    </View>
  );
};

export default Swipe;
