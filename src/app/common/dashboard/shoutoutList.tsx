import React from "react";
import { View, Text, Platform } from "react-native";
import colors from "../../../assets/colors";
import { cardStyle, listStyle, timeLogStyle } from "../../../assets/styles";
import { getColor, transformDate } from "../../utils/listtranform";
import normalize from "../../utils/normalize";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../renderHtml";
import { responseDay } from "../../utils/getDay";
import { getShortDate } from "../../utils";
import { getLeaveOption } from "../../utils/getLeaveType";
import { OverlappingAvatars } from "../overlappingAvatars";

const ShoutoutListItem = ({
  receiver,
  shoutout,
  shoutout_from,
  isLast,
  type,
  module,
  html,
  date,
  leave_option,
  avatar,
}: {
  receiver: [];
  shoutout: string;
  shoutout_from: [];
  leave_option: string;
  isLast: boolean;
  type?: string;
  module?: string;
  html: any;
  date?: string;
  avatar?: any;
}) => {
  const indicatorColor = getColor(type, colors.lightbrown);
  receiver.map((item: any) => {
    console.log(item, "item");
  });
  return (
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
          {shoutout?.length > 30 ? shoutout.slice(0, 30) + "..." : shoutout}
        </Text>
        <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
          {getShortDate(date)}
        </Text>
        {/* {module == "shoutouts" && <OverlappingAvatars avatars={avatar} />} */}
      </View>
      <Text style={cardStyle.subTitleText}>{shoutout}</Text>
      <View
        style={[
          timeLogStyle.indicator,
          cardStyle.indicator,
          {
            backgroundColor: indicatorColor,
            ...Platform.select({
              ios: {
                marginRight: normalize(-1),
              },
            }),
          },
        ]}
      />
    </View>
  );
};

export { ShoutoutListItem };
