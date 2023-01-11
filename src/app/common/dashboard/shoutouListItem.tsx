import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cardStyle, listStyle } from "../../../assets/styles";
import { navigate } from "../../utils/navigation";
import { formatFullName } from "../../utils/constants";

const ShoutoutListItem = ({
  receiver,
  shoutout,
  shoutout_from,
  isLast,
  type,
  module,
  date,
  avatar,
  key,
}: {
  receiver: [];
  shoutout: string;
  shoutout_from: [];
  isLast?: boolean;
  type?: string;
  module?: string;
  date?: string;
  avatar?: any;
  key?: any;
}) => {
  const receiverData: any = receiver;
  const senderData: any = shoutout_from;
  const length = receiver.length;

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("shoutoutDetail", {
          detail: {
            receiver: receiver,
            shoutout: shoutout,
            shoutout_from: shoutout_from,
            date: date,
            avatar: avatar,
          },
        });
      }}
    >
      <View
        style={[
          listStyle.itemContainer,
          {
            borderBottomWidth: isLast ? 0 : 1,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
          }}
        >
          <Text style={cardStyle.titleText}>
            {shoutout?.length > 30 ? shoutout.slice(0, 100) + "..." : shoutout}
          </Text>
          {/* /code will be in need */}
          {/* <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
            {getShortDate(date)}
          </Text> */}
          {/* {module == "shoutouts" && <OverlappingAvatars avatars={avatar} />} */}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Text style={[cardStyle.subTitleText]}>
            {receiverData.length &&
              receiverData.map((item: any, index: any) => {
                {
                  const comma = length - 1 === index ? "" : ",";
                  return (
                    formatFullName(item?.first_name, item?.last_name) + comma
                  );
                }
              })}
          </Text>
          <Text style={[cardStyle.subTitleText]}> received shoutout from </Text>
          <Text style={[cardStyle.subTitleText]}>
            {senderData.length &&
              senderData.map((item: any) => {
                return formatFullName(item?.first_name, item?.last_name) + ".";
              })}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}></View>
      </View>
    </TouchableOpacity>
  );
};

export { ShoutoutListItem };
