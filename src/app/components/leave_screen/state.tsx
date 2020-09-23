import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import { requestStyle as style } from "../../../assets/styles";

const State = ({ state }: any) => {
  return (
    <View style={style.row}>
      {state === "Approved" && (
        <>
          <Icon name="check-circle" size={20} color={colors.green} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === "Denied" && (
        <>
          <Icon name="alert-circle" size={20} color={colors.tomato} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === "In Progress" && (
        <>
          <View style={style.progress}>
            <Icon name="timer-sand" size={13} color={colors.white} />
          </View>
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
    </View>
  );
};

export default State;
