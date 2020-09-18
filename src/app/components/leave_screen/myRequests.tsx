import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { myRequestsStyle as style } from "../../../assets/styles";
import History from "./history";
import { Request } from "./request";
import Swipe from "./swipe";
import colors from "../../../assets/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MyRequests = () => {
  const [toggle, setToggle] = useState("on");
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
        <View style={style.row}>
          <Text style={style.history}>Show History</Text>
          <View style={style.gap}></View>
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
        renderItem={(item) => (
          <Swipeable renderRightActions={() => <Swipe />}>
            <Request item={item} />
          </Swipeable>
        )}
        keyExtractor={(item) => item.date}
      />
      {toggle === "on" && <History />}
    </View>
  );
};

export { MyRequests };
