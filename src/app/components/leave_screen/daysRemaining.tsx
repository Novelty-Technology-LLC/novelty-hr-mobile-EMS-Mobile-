import React from "react";
import { View, Text } from "react-native";
import { daysRemainingStyle as style } from "../../../assets/styles/";

interface DaysRemainingPropType {
  total: number;
  remaining: number;
  title: String;
}

const DaysRemaining = ({ total, remaining, title }: DaysRemainingPropType) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>
        <Text style={style.remaining}>{remaining}</Text>
        <Text style={style.total}>/{total}</Text>
      </Text>
      <Text style={style.title}>{title}</Text>
      <Text style={style.footer}>REMAINING</Text>
    </View>
  );
};

export { DaysRemaining };
