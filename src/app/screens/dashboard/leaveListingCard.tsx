import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import State from "../../components/leave_screen/state";
import {
  cardStyle,
  headerTxtStyle,
  holidayListingStyle,
  requestStyle,
} from "../../../assets/styles";

const LeaveListingCard = ({ index, listLength, item }) => (
  <View
    key={index}
    style={[
      holidayListingStyle.container,
      {
        borderBottomWidth: listLength - 1 === index ? 0 : 1,
      },
    ]}
  >
    <View>
      <Text style={cardStyle.titleText}>{item?.title}</Text>
      <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
    </View>
    <View>
      <State state={item?.status} />
    </View>
  </View>
);
export { LeaveListingCard };
