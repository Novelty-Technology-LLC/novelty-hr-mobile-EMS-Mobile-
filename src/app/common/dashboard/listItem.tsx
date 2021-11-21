import React from "react";
import { View, Text, Platform } from "react-native";
import colors from "../../../assets/colors";
import { cardStyle, listStyle, timeLogStyle } from "../../../assets/styles";
import { getColor } from "../../utils/listtranform";
import normalize from "../../utils/normalize";
import { useWindowDimensions } from "react-native";
import { RenderHtmlComponent } from "../renderHtml";

const ListItem = ({
  title,
  subTitle,
  isLast,
  type,
  module,
  date,
}: {
  title: string;
  subTitle: string;
  isLast: boolean;
  type?: string;
  module?: string;
  date?: string;
}) => {  
  const indicatorColor = getColor(type, colors.lightbrown);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        listStyle.itemContainer,
        {
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <Text style={cardStyle.titleText}>{title}</Text>
      {module == "Announcements" ? (
        <RenderHtmlComponent htmlData={subTitle} />
      ) : (
        <Text style={cardStyle.subTitleText}>{subTitle}</Text>
      )}
      {date && <Text>{date}</Text>}
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
