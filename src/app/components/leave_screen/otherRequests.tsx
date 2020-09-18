import React, { useState } from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { myRequestsStyle, otherRequestsStyle } from "../../../assets/styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../../assets/colors";

const OtherRequests = () => {
  const [toggle, setToggle] = useState("on");
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
    </View>
  );
};

export default OtherRequests;
