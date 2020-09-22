import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { myRequestsStyle as style } from "../../../assets/styles";
import History from "./history";
import { Request } from "./request";
import Swipe from "./swipe";
import colors from "../../../assets/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RequestContext, useRequest } from "../../reducer";

const MyRequests = () => {
  const navigation = useNavigation();
  const { requests, data } = useContext(RequestContext);
  // console.log(data);

  const [toggle, setToggle] = useState("toggle-switch");

  useEffect(() => {
    console.log(requests.requests);
    console.log("data", requests.data);
  }, [data]);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>My Requests</Text>
        <View style={style.row}>
          <Text style={style.history}>Show History</Text>
          <View style={style.gap}></View>
          <TouchableWithoutFeedback
            onPress={() => {
              setToggle(
                toggle === "toggle-switch"
                  ? "toggle-switch-off"
                  : "toggle-switch"
              );
            }}
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
        data={requests.requests}
        renderItem={(item) => (
          <Swipeable renderRightActions={() => <Swipe item={item.item} />}>
            <Request
              item={item.item}
              other={false}
              onPress={() => navigation.navigate("requestDetail", item.item)}
            />
          </Swipeable>
        )}
        keyExtractor={(item) => item.date}
      />

      {toggle === "toggle-switch" && <History />}
    </View>
  );
};

export { MyRequests };
