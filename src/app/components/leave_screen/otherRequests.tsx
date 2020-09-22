import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { myRequestsStyle, otherRequestsStyle } from "../../../assets/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import { Request } from "./request";
import History from "./history";

const OtherRequests = () => {
  const [toggle, setToggle] = useState("toggle-switch");
  const requests = [
    {
      id: 2,
      date: "Oct 28 (1 day)",
      type: "FLOATING",
      state: "In Progress",
      sender: "Biren Gurung",
    },
    {
      id: 3,
      date: "Oct 30 (1 day)",
      type: "PAID TIME OFF",
      state: "Denied",
      sender: "Biren Gurung",
    },
  ];

  return (
    <View style={otherRequestsStyle.container}>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Recieved</Text>
        <View style={myRequestsStyle.row}>
          <Text style={myRequestsStyle.history}>Show History</Text>
          <View style={myRequestsStyle.gap}></View>
          <TouchableWithoutFeedback
            onPress={() =>
              setToggle(
                toggle === "toggle-switch"
                  ? "toggle-switch-off"
                  : "toggle-switch"
              )
            }
          >
            <Icon
              name={toggle}
              color={
                toggle === "toggle-switch" ? colors.primary : colors.secondary
              }
              size={40}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <FlatList
        data={requests}
        renderItem={(item) => (
          <Request item={item.item} other={true} recieved={true} />
        )}
        keyExtractor={(item) => item.date}
      />
      {toggle === "toggle-switch" && <History other={true} />}
    </View>
  );
};

export default OtherRequests;
