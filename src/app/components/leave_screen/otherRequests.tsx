import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { myRequestsStyle, otherRequestsStyle } from "../../../assets/styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors";
import { Request } from "./request";

const OtherRequests = () => {
  const [toggle, setToggle] = useState("on");
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
    <View>
      <View style={otherRequestsStyle.header}>
        <Text style={myRequestsStyle.title}> Requests Recieved</Text>
        <View style={myRequestsStyle.row}>
          <Text style={myRequestsStyle.history}>Show History</Text>
          <View style={myRequestsStyle.gap}></View>
          <TouchableWithoutFeedback
            onPress={() => setToggle(toggle === "on" ? "off" : "on")}
          >
            <Icon
              name={"toggle-" + toggle}
              color={toggle === "on" ? colors.primary : colors.secondary}
              size={25}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <FlatList
        data={requests}
        renderItem={(item) => <Request item={item} other={true} />}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
};

export default OtherRequests;
