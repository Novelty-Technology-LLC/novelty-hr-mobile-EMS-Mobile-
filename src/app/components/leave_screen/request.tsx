import React from "react";
import { View, Text } from "react-native";
import { requestStyle as style } from "../../../assets/styles";
import State from "./state";

const Request = ({ item }: any) => {
  return (
    <View style={style.container}>
      <View>
        <Text style={style.date}>{item.item.date}</Text>
        <Text style={style.type}>{item.item.type}</Text>
      </View>
      <State state={item.item.state} />
      {/* <Text style={style.state}>{item.item.state}</Text> */}
    </View>
  );
};

export { Request };
