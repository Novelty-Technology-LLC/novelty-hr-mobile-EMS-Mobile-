import React from "react";
import { View, Text } from "react-native";
import { requestStyle as style } from "../../../assets/styles";
import RequestWithImage from "./requestWithImage";
import State from "./state";

const Request = ({ item, other }: any) => {
  return (
    <View style={style.container}>
      {other ? (
        <RequestWithImage item={item} />
      ) : (
        <View>
          <Text style={style.date}>{item.item.date}</Text>
          <Text style={style.type}>{item.item.type}</Text>
        </View>
      )}
      <State state={item.item.state} />
    </View>
  );
};

export { Request };
