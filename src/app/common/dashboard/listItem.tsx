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

const ListItem = ({
  title,
  subTitle,
  isLast,
  type,
  module,
  html,
  date,
  leave_option,
}: {
  title: string;
  subTitle: string;
  leave_option: string;
  isLast: boolean;
  type?: string;
  module?: string;
  html: any;
  date?: string;
}) => {
  const indicatorColor = getColor(type, colors.lightbrown);

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
          {title?.length > 30 ? title.slice(0, 30) + "..." : title}
        </Text>
        {module == "Announcements" && (
          <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
            {getShortDate(date)}
          </Text>
        )}
      </View>

      {module == "Announcements" ? (
        <RenderHtmlComponent
          htmlData={subTitle.trim()}
          style={{ div: cardStyle.subTitleText, p: cardStyle.subTitleText }}
        />
      ) : (
        // <Text style={cardStyle.subTitleText}>{subTitle}</Text>
        <Text style={cardStyle.subTitleText}>{subTitle}</Text>
      )}
      {module === "Leave" && leave_option !== "FULL DAY" && (
        <Text style={cardStyle.subTitleText}>
          {`${getLeaveOption(leave_option)}`}
        </Text>
      )}
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

export { ListItem };
