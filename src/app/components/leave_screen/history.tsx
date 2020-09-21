import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  historyStyle as style,
  otherRequestsStyle,
} from "../../../assets/styles";
import { Request } from "./request";
import RequestWithImage from "./requestWithImage";

const History = ({ other }: any) => {
  const pastrequests = [
    {
      id: 1,
      date: "Sept 20-23 (3 days)",
      type: "PAID TIME OFF",
      state: "Approved",
      sender: "Biren Gurung",
    },
    {
      id: 2,
      date: "Jan 28 (1 day)",
      type: "FLOATING",
      state: "Denied",
      sender: "Biren Gurung",
    },
  ];

  return (
    <View>
      <Text style={style.header}>Past Requests</Text>
      <FlatList
        data={pastrequests}
        renderItem={(item) => <Request item={item.item} other={other} />}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default History;
