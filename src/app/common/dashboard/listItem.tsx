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

const ListItem = ({
  title,
  subTitle,
  isLast,
  type,
  module,
  html,
  date,
}: {
  title: string;
  subTitle: string;
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
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </Text>
        {module == "Announcements" && (
          <Text style={[cardStyle.dateText, { fontSize: 11 }]}>
            {getShortDate(date)}
          </Text>
        )}
      </View>
      {module == "Announcements" ? (
        <Text style={cardStyle.subTitleText}>{subTitle}</Text>
      ) : (
        <Text style={cardStyle.subTitleText}>{subTitle}</Text>
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
