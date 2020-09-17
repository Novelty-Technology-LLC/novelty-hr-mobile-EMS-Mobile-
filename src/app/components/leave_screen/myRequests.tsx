import React from "react";
import { View, Text, FlatList } from "react-native";
import { myRequestsStyle as style } from "../../../assets/styles";
import History from "./history";
import { Request } from "./request";

const MyRequests = () => {
  const requests = [
    {
      id: 1,
      date: "Oct 20-24 (4 days)",
      type: "PAID TIME OFF",
      state: "Approved",
    },
    { id: 2, date: "Oct 28 (1 day)", type: "FLOATING", state: "In Progress" },
    { id: 3, date: "Oct 30 (1 day)", type: "PAID TIME OFF", state: "Denied" },
  ];

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>My Requests</Text>
        <Text style={style.history}>Show History</Text>
      </View>
      <View style={style.list}>
        <FlatList
          data={requests}
          renderItem={(item) => <Request item={item} />}
          keyExtractor={(item) => item.date}
        />
      </View>
      <History />
    </View>
  );
};

export { MyRequests };
